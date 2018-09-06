/**
 * @param word the word to hash as the key for the record set
 */

export const keyService = {
  getKey: (word: string) => {
    return word.split('').sort().join('');
  }
}