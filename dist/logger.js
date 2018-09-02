"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bunyan_1 = __importDefault(require("bunyan"));
var logger = bunyan_1["default"].createLogger({
    name: 'Anagram-Search-Api'
});
exports["default"] = logger;
