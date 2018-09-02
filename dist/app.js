"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
var port = process.env.PORT ? +process.env.PORT : 3000;
app.use('/', function (req, res, next) {
    res.send(200);
});
app.listen(port, function () { return console.log("Express server listening on port " + port); });
