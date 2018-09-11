import fs from 'fs';

import redis from 'redis-stream';
import zlib from 'zlib';

import { keyService } from './db/key.service';
import logger from './logger';

function streamToRedis(port: number, host: string, filePath: string) {
  const client = new redis(port, host);
  const stream = client.stream();

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
      // process.exit();
    });

}

export const importService = {
  streamToRedis
}