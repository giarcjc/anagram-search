"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var anagrams_1 = require("./api/anagrams");
var words_1 = require("./api/words");
var errors_1 = __importDefault(require("./errors"));
var logger_1 = __importDefault(require("./logger"));
var middleware_1 = __importDefault(require("./middleware"));
var app = express_1["default"]();
app.use(middleware_1["default"]);
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
var port = process.env.PORT ? +process.env.PORT : 3000;
app.use('/words.json', words_1.words);
app.use('/words', words_1.words);
app.use('/anagrams', anagrams_1.anagrams);
// error logging - must go last
app.use(errors_1["default"]);
app.listen(port, function () { return logger_1["default"].info("Express server bunyan listening on port " + port); });
