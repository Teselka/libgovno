"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
var Response = /** @class */ (function () {
    function Response(res, chunks) {
        this._redirects = 0;
        this._res = res;
        this._chunks = chunks;
    }
    Response.prototype._set_redirects = function (x) {
        this._redirects = x;
    };
    Object.defineProperty(Response.prototype, "body", {
        get: function () {
            return this._chunks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "text", {
        get: function () {
            return this._chunks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "headers", {
        get: function () {
            return this._res ? this._res.headers : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "status", {
        get: function () {
            return this._res ? this._res.statusCode : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "status_code", {
        get: function () {
            return this.status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "encoding", {
        get: function () {
            return this._res ? this._res.headers['content-encoding'] : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "cookies", {
        get: function () {
            return this._res ? this._res.headers['set-cookie'] : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "redirects", {
        get: function () {
            return this._redirects;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "is_redirect", {
        get: function () {
            return this._redirects > 0;
        },
        enumerable: false,
        configurable: true
    });
    Response.prototype.json = function () {
        return JSON.parse(this._chunks);
    };
    Response.prototype.toString = function () {
        return 'ABOBA';
    };
    return Response;
}());
exports.Response = Response;