import fs from 'fs';
import path from 'path';
import redis from 'redis-stream';
import zlib from 'zlib';
import env from './environment';
import { keyService } from './db/key.service';
import logger from './logger';

const redisPort:number = env.REDIS_PORT ? +env.REDIS_PORT : 6379;

const client = new redis(redisPort, env.REDIS_HOST);
const stream = client.stream();
const gunzip = zlib.createGunzip();
const filePath = path.join(__dirname, '../dictionary.txt.gz');

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
