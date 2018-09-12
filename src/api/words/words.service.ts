import { dbService } from '../../db/db.service';
import { keyService } from '../../db/key.service';

/**
 * @param data JSON array of English-language words to add to the corpus (data store).
 */
function addToDataStore(data: string[]) {
  const hashKey: string = keyService.getKey(data[0]);
  data.forEach((word) => dbService.addWordsToSet(hashKey, word));
  return Promise.resolve();
}

/**
 * @param word  single word to delete from the data store.
 */
function removeFromDataStore(word: string, drop?: string) {
  const hashKey: string = keyService.getKey(word);

  if (drop && drop === 'all') {
    dbService.removeSetByKey(hashKey);
    return Promise.resolve();
  }

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
  removeFromDataStore,
}
