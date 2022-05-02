"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
var response_1 = require("./response");
var https = require("https");
var http = require("http");
// proxy callback
function proxy_callback(err, data, opts) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!err
                        && (opts.options !== undefined && typeof (opts.options) == 'object' && opts.options.follow_redirects == true)
                        && data.status == 301 && data.headers.location !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, request(data.headers.location, opts.options, opts.callback)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(opts.real_callback !== undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, opts.real_callback(err, data)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    if (err)
                        throw err;
                    if (opts.redirects !== undefined)
                        data._set_redirects(opts.redirects);
                    return [2 /*return*/, data];
            }
        });
    });
}
/*
    base request function
*/
function request(url, options, callback) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var opts, headers, send_data, params, first, _d, _e, _i, i, _f, i, myurl, port, lib, success, chunks, err, response, req;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    opts = {};
                    if (options && typeof (options) == 'object')
                        opts = options;
                    if (callback && typeof (callback) == 'function')
                        opts.callback = callback;
                    headers = {};
                    send_data = null;
                    headers['User-Agent'] = (_a = opts.useragent) !== null && _a !== void 0 ? _a : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0';
                    if (!(opts.json !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, JSON.stringify(opts.json)];
                case 1:
                    send_data = _g.sent();
                    headers['Content-Type'] = 'application/json; charset=utf-8';
                    headers['Content-Length'] = (_b = send_data.length) !== null && _b !== void 0 ? _b : 0;
                    return [3 /*break*/, 3];
                case 2:
                    if (opts.raw_data !== undefined) {
                        send_data = opts.raw_data;
                    }
                    _g.label = 3;
                case 3:
                    if (!(opts.params !== undefined)) return [3 /*break*/, 8];
                    params = url[url.length - 1] == '?' ? '' : '?';
                    first = false;
                    _d = [];
                    for (_e in opts.params)
                        _d.push(_e);
                    _i = 0;
                    _g.label = 4;
                case 4:
                    if (!(_i < _d.length)) return [3 /*break*/, 7];
                    i = _d[_i];
                    if (!first)
                        first = true;
                    params += "&";
                    _f = params;
                    return [4 /*yield*/, (encodeURIComponent(i) + "=" + encodeURIComponent(opts.params[i]))];
                case 5:
                    params = _f + _g.sent();
                    _g.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    url += params;
                    _g.label = 8;
                case 8:
                    if (opts.headers !== undefined) {
                        for (i in opts.headers) {
                            headers[i] = opts.headers[i];
                        }
                    }
                    if (headers['Accept'] === undefined)
                        headers['Accept'] = '*/*';
                    if (headers['Accept-Encoding'] === undefined)
                        headers['Accept'] = 'gzip, deflate';
                    myurl = new URL(url);
                    if ((opts.worldwide === undefined || opts.worldwide === true)
                        && !myurl.hostname.startsWith('www.')) {
                        myurl.hostname = 'www.'.concat(myurl.hostname);
                    }
                    port = (_c = opts.port) !== null && _c !== void 0 ? _c : (myurl.port.length > 0 ? myurl.port : "443");
                    lib = myurl.protocol == 'http:' ? http : https;
                    success = false;
                    chunks = '';
                    err = null;
                    response = undefined;
                    req = lib.request({
                        hostname: myurl.hostname,
                        port: port,
                        headers: headers,
                        method: opts.method,
                        timeout: opts.timeout,
                        path: myurl.pathname + myurl.search
                    }, function (res) {
                        response = res;
                        var total = '';
                        res.on('data', function (chunk) { chunks += chunk; });
                        res.on('end', function () {
                            if (opts !== undefined && opts.callback) {
                                proxy_callback(err, new response_1.Response(res, chunks), { url: url, options: options, callback: callback, real_callback: opts.callback, redirects: 0 });
                            }
                            success = true;
                        });
                    });
                    req.on('error', function (_err) { err = _err; });
                    if (send_data !== null)
                        req.write(send_data);
                    req.end();
                    if (!!opts.callback) return [3 /*break*/, 13];
                    _g.label = 9;
                case 9:
                    if (!(!err && !success)) return [3 /*break*/, 11];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
                case 10:
                    _g.sent();
                    return [3 /*break*/, 9];
                case 11:
                    if (err)
                        throw err;
                    return [4 /*yield*/, proxy_callback(err, new response_1.Response(response, chunks), { url: url, options: options, callback: callback, real_callback: undefined, redirects: 0 })];
                case 12: return [2 /*return*/, _g.sent()];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.request = request;
// Common requests
[
    'GET',
    'POST',
    'HEAD',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH'
].forEach(function (v, i) {
    module.exports[v.toLowerCase()] = function (url, options, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof (options) == 'object')
                            options.method = v.toUpperCase();
                        return [4 /*yield*/, request(url, options, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
});