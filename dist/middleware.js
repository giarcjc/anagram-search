"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var logger_1 = __importDefault(require("./logger"));
function middleware(req, res, next) {
    var method = req.method, originalUrl = req.originalUrl, body = req.body;
    var statusCode = res.statusCode;
    logger_1["default"].info("Incoming Request: " + method + ": " + originalUrl + " " + (body ? body : ''));
    logger_1["default"].info("Outgoing Response: " + statusCode);
    next();
}
exports["default"] = middleware;
