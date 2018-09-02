"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var logger_1 = __importDefault(require("./logger"));
function logErrors(err, req, res, next) {
    logger_1["default"].error(err);
    res.status(err.statusCode).send(err);
}
exports["default"] = logErrors;
