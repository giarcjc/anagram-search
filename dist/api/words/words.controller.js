"use strict";
exports.__esModule = true;
var express_1 = require("express");
var words_service_1 = require("./words.service");
var perf_hooks_1 = require("perf_hooks");
var router = express_1.Router();
router.post('/', function (req, res, next) {
    perf_hooks_1.performance.mark('startPOST');
    if (!req.body.words) {
        // TODO: use ajv for validation
        throw new Error('Expected request to have property "words"');
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
