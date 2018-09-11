import { dbService } from '../../db/db.service';
import { keyService } from '../../db/key.service';

/**
 * Returns a JSON array of English-language words that are anagrams
 * of the word passed in the URL.
 *
 * Needs to call DB and get all anagram results for given word
 */
async function getAnagrams(word: string, limit?: number) {
  const hashKey: string = keyService.getKey(word);
  const results = await dbService.listWordsByKey(hashKey);
  const anagrams = {
    'anagrams': Object.values(results).filter(i => i !== word).slice(0, limit)
  }
  return anagrams;
}

export const anagramsService = {
  getAnagrams,
};
