
/**
 * @param word the word to hash as the key for the record set
 */
function getKey(word: string) {
  return word.split('').sort().join('');
}

export const keyService = {
  getKey
};