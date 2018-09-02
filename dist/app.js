"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var anagrams_1 = require("./api/anagrams");
var words_1 = require("./api/words");
var logger_1 = __importDefault(require("./logger"));
var app = express_1["default"]();
var middleware = function (req, res, next) {
    var method = req.method, originalUrl = req.originalUrl, body = req.body;
    var statusCode = res.statusCode;
    logger_1["default"].info("Incoming Request: " + method + ": " + originalUrl + " " + (body ? body : ''));
    logger_1["default"].info("Outgoing Response: " + statusCode);
    next();
};
function logErrors(err, req, res, next) {
    logger_1["default"].info('------------------------');
    logger_1["default"].error(err);
    res.status(err.statusCode).send(err);
    // next(err);
}
app.use(middleware);
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
var port = process.env.PORT ? +process.env.PORT : 3000;
app.use('/words.json', words_1.words);
app.use('/words', words_1.words);
app.use('/anagrams', anagrams_1.anagrams);
app.use(logErrors);
app.listen(port, function () { return logger_1["default"].info("Express server bunyan listening on port " + port); });
