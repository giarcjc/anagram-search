"use strict";
exports.__esModule = true;
var express_1 = require("express");
var anagrams_service_1 = require("./anagrams.service");
var router = express_1.Router();
/**
 * This endpoint should support an optional query param
 * that indicates the maximum number of results to return.
 */
router.get('/:word.json', function (req, res, next) {
    return anagrams_service_1.anagramsService.getAnagrams(req.params.word, req.query.limit)
        .then(function (json) {
        res.send(json);
    })["catch"](function (err) { return next(err); });
});
exports.anagrams = router;
