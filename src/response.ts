import { stat } from "fs";
import { IncomingMessage } from "http";

export class Response
{
    private _res: IncomingMessage;
    private _chunks: string;
    private _redirects: number = 0;

    constructor(res: IncomingMessage, chunks: string) {
        this._res = res;
        this._chunks = chunks;
    }

    _set_redirects(x: number) {
        this._redirects = x;
    }

    get body() {
        return this._chunks;
    }

    get text() {
        return this._chunks;
    }

    get headers() {
        return this._res ? this._res.headers : null;
    }

    get status() {
        return this._res ? this._res.statusCode : null;
    }

    get status_code() {
        return this.status;
    }

    get encoding() {
        return this._res ? this._res.headers['content-encoding'] : null;
    }

    get cookies() {
        return this._res ? this._res.headers['set-cookie'] : null;
    }

    get redirects() {
        return this._redirects;
    }

    get is_redirect() {
        return this._redirects > 0;
    }

    json(): object {
        return JSON.parse(this._chunks);
    }
}