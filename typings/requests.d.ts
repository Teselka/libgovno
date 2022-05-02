/// <reference types="node" />
import { Response } from './response';
import { OutgoingHttpHeaders } from 'http2';
declare type ResponseCallback = (err: Error, data: Response) => void;
declare type RequestOptions = {
    method?: string | undefined;
    port?: string | number | undefined;
    params?: object | undefined;
    json?: object | undefined;
    raw_data?: string | Buffer | undefined;
    headers?: OutgoingHttpHeaders | undefined;
    useragent?: string | undefined;
    timeout?: number | undefined;
    follow_redirects?: boolean | undefined;
    max_redirects?: number | undefined;
    worldwide?: boolean | undefined;
    callback?: ResponseCallback | undefined;
};
export declare function request(url: string, options?: RequestOptions | ResponseCallback, callback?: ResponseCallback): Promise<void | Response>;
export {};
