"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ajv_1 = __importDefault(require("ajv"));
var express_1 = require("express");
var words_service_1 = require("./words.service");
var ajv = new ajv_1["default"]();
var schema = {
    "maxProperties": 1,
    "properties": {
        "words": {
            "items": [
                { "type": "string" }
            ],
            "type": "array"
        }
    },
    "required": ["words"],
    "type": "object"
};
var validate = ajv.compile(schema);
var router = express_1.Router();
router.post('/', function (req, res, next) {
    if (!validate(req.body)) {
        var errorMsg = (validate.errors && validate.errors.length) ? validate.errors[0].message : 'Error: Invalid Parameters';
        var error = { statusCode: 400, message: errorMsg };
        return next(error);
    }
    return words_service_1.wordsService.addToDataStore(req.body.words)
        .then(function (json) {
        res.status(201).send(json);
    })["catch"](function (err) { return next(err); });
});
router["delete"]('/:word.json', function (req, res, next) {
    return words_service_1.wordsService.removeWordFromDataStore(req.params.word)
        .then(function () {
        res.sendStatus(204);
    })["catch"](function (err) { return next(err); });
});
router["delete"]('/', function (req, res, next) {
    return words_service_1.wordsService.dropDataStore()
        .then(function () {
        res.sendStatus(204);
    })["catch"](function (err) { return next(err); });
});
exports.words = router;
