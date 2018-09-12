"use strict";
exports.__esModule = true;
var db_service_1 = require("../../db/db.service");
var key_service_1 = require("../../db/key.service");
/**
 * @param data JSON array of English-language words to add to the corpus (data store).
 */
function addToDataStore(data) {
    var hashKey = key_service_1.keyService.getKey(data[0]);
    data.forEach(function (word) { return db_service_1.dbService.addWordsToSet(hashKey, word); });
    return Promise.resolve();
}
/**
 * @param word  single word to delete from the data store.
 */
function removeFromDataStore(word, drop) {
    var hashKey = key_service_1.keyService.getKey(word);
    if (drop && drop === 'all') {
        db_service_1.dbService.removeSetByKey(hashKey);
        return Promise.resolve();
    }
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
    removeFromDataStore: removeFromDataStore
};
