import fs from 'fs';
import path from 'path';
import redis from 'redis-stream';
import zlib from 'zlib';

import getKey from './db/key.service';

const client = new redis(6379, '127.0.0.1');
const stream = client.stream();


const filePath = path.join(__dirname, '../dictionary.txt.gz');

const gunzip = zlib.createGunzip();

let command;

stream
  .pipe(fs.createReadStream(filePath))
  .pipe(gunzip)
  .pipe(redis.es.split())
  .pipe(redis.es.map((word:string, cb:any) => {
    console.log('word: ', word);
    command = ['sadd', getKey(word), word];
    stream.redis.write(redis.parse(command));
    cb();
  }))
  .on('error', (err: any) => console.error('Error reading file: ', err))
  .on('end', () => {
    stream.end();
    console.log('end');
  })
  .on('close', () => {
    console.log('close');
    process.exit();
  });
