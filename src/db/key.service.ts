/**
 * @param word the word to hash as the key for the record set
 */
 export default function getKey(word: string) {
  return word.split('').sort().join('');
}