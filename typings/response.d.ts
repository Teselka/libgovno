/// <reference types="node" />
import { IncomingMessage } from "http";
export declare class Response {
    private _res;
    private _chunks;
    private _redirects;
    constructor(res: IncomingMessage, chunks: string);
    _set_redirects(x: number): void;
    get body(): string;
    get text(): string;
    get headers(): import("http").IncomingHttpHeaders;
    get status(): number;
    get status_code(): number;
    get encoding(): string;
    get cookies(): string[];
    get redirects(): number;
    get is_redirect(): boolean;
    json(): object;
    toString(): string;
}
