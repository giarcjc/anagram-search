import redis from 'redis';
import logger from '../logger';

const client = redis.createClient();
client.on('error', (err: any) => logger.error(err));


/**
 * @param key the hashKey to the record set
 * @param word the word to add to the set
 */
function addWordsToSet(key: string, word: string) {
  client.sadd(key, word, redis.print);
}

/**
 * @param key the hashKey to the record set
 * @param word the word to remove from the set
 */
function removeWordFromSet(key: string, word: string) {
  client.srem(key, word, redis.print);
}

/**
 * Will Drop the entire data store.  Careful!
 */
function dropDataStore() {
  client.flushall();
}

/**
 *
 * @param key
 */
function listWordsByKey(key: string) {
  return new Promise((resolve, reject) => {
    client.smembers(key, (err, result) => {
      if (err) {
        reject(err);
      };

      resolve(result);
    })
  })
}

export const dbService = {
  addWordsToSet,
  dropDataStore,
  listWordsByKey,
  removeWordFromSet,
}