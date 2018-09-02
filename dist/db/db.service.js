"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var redis_1 = __importDefault(require("redis"));
var logger_1 = __importDefault(require("../logger"));
var client = redis_1["default"].createClient();
client.on('error', function (err) { return logger_1["default"].error(err); });
/**
 * @param key the hashKey to the record set
 * @param word the word to add to the set
 */
function addWordsToSet(key, word) {
    client.sadd(key, word, redis_1["default"].print);
}
/**
 * @param key the hashKey to the record set
 * @param word the word to remove from the set
 */
function removeWordFromSet(key, word) {
    client.srem(key, word, redis_1["default"].print);
}
/**
 * Will Drop the entire data store.  Careful!
 */
function dropDataStore() {
    client.flushall();
}
/**
 *
 * @param key
 */
function listWordsByKey(key) {
    return new Promise(function (resolve, reject) {
        client.smembers(key, function (err, result) {
            if (err) {
                reject(err);
            }
            ;
            resolve(result);
        });
    });
}
exports.dbService = {
    addWordsToSet: addWordsToSet,
    dropDataStore: dropDataStore,
    listWordsByKey: listWordsByKey,
    removeWordFromSet: removeWordFromSet
};
