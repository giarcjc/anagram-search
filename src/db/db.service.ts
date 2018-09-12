
import redis, { RedisClient } from 'redis';

import logger from '../logger';

// const redisPort:number = env.REDIS_PORT ? +env.REDIS_PORT : 6379;

// const client = redis.createClient(redisPort, env.REDIS_HOST);

// client.on('error', (err: any) => logger.error(err));



let client:RedisClient;

function connectToRedis(port: number, host: string) {
  client = redis.createClient(port, host);
  client.on('error', (err: any) => logger.error(err));
  client.on('connect', () => logger.info('Successfully connected to Redis'));
}

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

function removeSetByKey(key: string) {
  client.del(key, redis.print);
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
  connectToRedis,
  dropDataStore,
  listWordsByKey,
  removeSetByKey,
  removeWordFromSet,
}