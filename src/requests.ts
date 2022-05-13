import { Response } from './response';
import { OutgoingHttpHeaders } from 'http2';
import * as https from 'https';
import * as http from 'http';

type ResponseCallback = (err: Error, data: Response) => void;
type RequestOptions = {
    method?: string | undefined,
    port?: string | number | undefined,
    params?: object | undefined,
    json?: object | undefined,
    raw_data?: string | Buffer | undefined,
    headers?: OutgoingHttpHeaders | undefined,
    cookies?: Array<object> | undefined,
    useragent?: string | undefined,
    timeout?: number | undefined,
    follow_redirects?: boolean | undefined,
    max_redirects?: number | undefined,
    worldwide?: boolean | undefined,
    callback?: ResponseCallback | undefined,

    /**
     * @deprecated
     * @description DO NOT USE!!! It's used internally
     * TODO: Do not expose it here
     */
    redirects?: number | undefined
};
type ProxyCallbackOptions =  {
    url: string, 
    options?: RequestOptions | ResponseCallback, 
    callback?: ResponseCallback,
    real_callback?: ResponseCallback | undefined,
    redirects?: number | undefined
}

// Prebuild regular expressions
const wwwexpr = new RegExp("\\.", 'g');

// proxy callback
async function proxy_callback(err: Error, data: Response, opts: ProxyCallbackOptions): Promise<void | Response> {
    // epic
    if (!err 
        && (opts.options !== undefined && typeof(opts.options) == 'object' && opts.options.follow_redirects == true) 
        && data.headers.location !== undefined) {
            opts.options.redirects = opts.redirects === undefined && 1 || opts.redirects+1;
            return await request(data.headers.location, opts.options, opts.callback);
        }
    else if (opts.real_callback !== undefined)
        return await opts.real_callback(err, data);
    else {
        if (err)
            throw err;

        if (opts.redirects !== undefined)
            data._set_redirects(opts.redirects);
        
        return data;
    }
}

/*
    base request function
*/
export async function request(url: string, options?: RequestOptions | ResponseCallback, callback?: ResponseCallback): Promise<void | Response> {
    let opts: RequestOptions = {};
    if (options && typeof(options) == 'object')
        opts = options;

    if (callback && typeof(callback) == 'function')
        opts.callback = callback;

    const headers: OutgoingHttpHeaders = {};
    let send_data = null;

    headers['User-Agent'] = opts.useragent ?? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0';

    if (opts.json !== undefined) {
        send_data = await JSON.stringify(opts.json);
        headers['Content-Type'] = 'application/json; charset=utf-8';
        headers['Content-Length'] = send_data.length ?? 0;
    }
    else if (opts.raw_data !== undefined) {
        send_data = opts.raw_data;
    }
    
    if (opts.params !== undefined) {
        let params = url[url.length-1] == '?' ? '' : '?';
        let first = false;
        for (let i in opts.params) {
            if (!first) first=true; params += "&";
            params += await (encodeURIComponent(i)+"="+encodeURIComponent(opts.params[i]));
        }
        url += params;
    }

    if (opts.cookies !== undefined) {
        let str = '';
        for (let i in opts.cookies) {
            if (typeof(opts.cookies[i]['name']) === 'string' 
                && typeof(opts.cookies[i]['value']) === 'string') {
                str += `${opts.cookies[i]['name']}=${opts.cookies[i]['value']}; `;
            }
        }

        if (str[str.length-2] === ';' && str[str.length-1] === ' ')
            str = str.substring(0, str.length-2);

        headers['cookie'] = str;
    }

    if (opts.headers !== undefined) {
        for (let i in opts.headers) {
            headers[i] = opts.headers[i];
        }
    }

    if (headers['Accept'] === undefined)
        headers['Accept'] = '*/*';

    if (headers['Accept-Encoding'] === undefined)
        headers['Accept-Encoding'] = '*';
    
    const myurl = new URL(url);
    if ((opts.worldwide === undefined   
            && !myurl.hostname.startsWith('www.') 
            && Array.from(myurl.hostname.matchAll(wwwexpr), m => m[0]).length == 1)
        || (opts.worldwide === true && !myurl.hostname.startsWith('www.'))) 
    {
        myurl.hostname = 'www.'.concat(myurl.hostname);
    }
    
    const port = opts.port ?? (myurl.port.length > 0 ? myurl.port : "443")
    const lib = https;   

    let success = false;
    let chunks = '';
    let err = null;
    let response: http.IncomingMessage = undefined;
    
    const req = lib.request({
        hostname: myurl.hostname,
        port: port,
        headers: headers,
        method: opts.method,
        timeout: opts.timeout,
        path: myurl.pathname + myurl.search
    }, (res) => {
        response = res;

        let total = '';
        res.on('data', (chunk) => {chunks += chunk;});
        res.on('end', () => {
            if (opts !== undefined && opts.callback) {
                proxy_callback(err, new Response(res, chunks), {url, options, callback, real_callback: opts.callback, redirects: opts.redirects });
            }

            success = true;
        })
    });

    req.on('error', (_err) => {err = _err;});

    if (send_data !== null)
        req.write(send_data);
    
    req.end();

    // Synced execution support
    if (!opts.callback) {
        while (!err && !success) {
            await new Promise(r => setTimeout(r, 100));
        }

        if (err)
            throw err;
        
        return await proxy_callback(err, new Response(response, chunks), {url, options, callback, real_callback: undefined, redirects: opts.redirects });
    }
}

// Declaring functions 
function __wrapperfn(name) {
    return async (url: string, options?: RequestOptions | ResponseCallback, callback?: ResponseCallback) => {
        if (typeof(options) == 'object') 
            options.method = name; 
            
        return await request(url, options, callback);
    }
}

module.exports = {
    get: __wrapperfn('GET'),
    post: __wrapperfn('POST'),
    head: __wrapperfn('HEAD'),
    put: __wrapperfn('PUT'),
    delete: __wrapperfn('DELETE'),
    connect: __wrapperfn('CONNECT'),
    options: __wrapperfn('OPTIONS'),
    trace: __wrapperfn('TRACE'),
    patch: __wrapperfn('PATCH')
}