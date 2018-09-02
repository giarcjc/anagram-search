import { dbService } from '../../db/db.service';
import getKey from '../../db/key.service';

/**
 * @param data JSON array of English-language words to add to the corpus (data store).
 */
function addToDataStore(data: string[]) {
  const hashKey: string = getKey(data[0]);
  data.forEach((word) => dbService.addWordsToSet(hashKey, word));
  return Promise.resolve();
}

/**
 * @param word  single word to delete from the data store.
 */
function removeWordFromDataStore(word: string) {
  const hashKey: string = getKey(word);
  dbService.removeWordFromSet(hashKey, word);
  return Promise.resolve();
}

/**
 * Deletes all contents of the data store.
 */
function dropDataStore() {
  dbService.dropDataStore();
  return Promise.resolve();
}

export const wordsService = {
  addToDataStore,
  dropDataStore,
  removeWordFromDataStore,
}
