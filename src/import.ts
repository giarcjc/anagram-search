import fs from 'fs';
import path from 'path';
import redis from 'redis-stream';
import zlib from 'zlib';

import { keyService } from './db/key.service';
import logger from './logger';

const client = new redis(6379, '127.0.0.1');
const stream = client.stream();

const filePath = path.join(__dirname, '../dictionary.txt.gz');

const gunzip = zlib.createGunzip();

let command;
logger.info('Importing dictionary file to DB...please be patient');
stream
  .pipe(fs.createReadStream(filePath))
  .pipe(gunzip)
  .pipe(redis.es.split())
  .pipe(redis.es.map((word:string, cb:any) => {
    logger.trace('word: ', word);
    command = ['sadd', keyService.getKey(word), word];
    stream.redis.write(redis.parse(command));
    cb();
  }))
  .on('error', (err: any) => logger.trace('Error reading file: ', err))
  .on('end', () => {
    stream.end();
    logger.trace('end');
  })
  .on('close', () => {
    logger.info('Finished Importing Dictionary File.');
    process.exit();
  });
