"use strict";
/**
 * @param word the word to hash as the key for the record set
 */
exports.__esModule = true;
exports.keyService = {
    getKey: function (word) {
        return word.split('').sort().join('');
    }
};
