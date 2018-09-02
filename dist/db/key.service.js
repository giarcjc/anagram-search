"use strict";
exports.__esModule = true;
/**
 * @param word the word to hash as the key for the record set
 */
function getKey(word) {
    return word.split('').sort().join('');
}
exports.keyService = {
    getKey: getKey
};
