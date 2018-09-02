"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var db_service_1 = require("../../db/db.service");
var key_service_1 = __importDefault(require("../../db/key.service"));
/**
 * @param data JSON array of English-language words to add to the corpus (data store).
 */
function addToDataStore(data) {
    var hashKey = key_service_1["default"](data[0]);
    data.forEach(function (word) { return db_service_1.dbService.addWordsToSet(hashKey, word); });
    return Promise.resolve();
}
/**
 * @param word  single word to delete from the data store.
 */
function removeWordFromDataStore(word) {
    var hashKey = key_service_1["default"](word);
    db_service_1.dbService.removeWordFromSet(hashKey, word);
    return Promise.resolve();
}
/**
 * Deletes all contents of the data store.
 */
function dropDataStore() {
    db_service_1.dbService.dropDataStore();
    return Promise.resolve();
}
exports.wordsService = {
    addToDataStore: addToDataStore,
    dropDataStore: dropDataStore,
    removeWordFromDataStore: removeWordFromDataStore
};
