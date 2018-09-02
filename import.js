const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const redis = require('redis-stream');
const keyService = require('./dist/db/key.service');
const client = new redis(6379, '127.0.0.1');
const stream = client.stream();
const filePath = path.join(__dirname, './dictionary.txt');

function getKey(word) {
  return word.split('').sort().join('');
}

let command;

stream
  .pipe(fs.createReadStream(filePath))
  // .pipe(zlib.unzip())
  .pipe(redis.es.split())
  .pipe(redis.es.map((word, cb) => {
    console.log('word: ', word);
    command = ['sadd', getKey(word), word];
    stream.redis.write(redis.parse(command));
    cb();
  }))
  .on('error', err => console.error('Error reading file: ', err))
  .on('end', () => {
    stream.end();
    console.log('end');
  })
  .on('close', () => {
    console.log('close');
    process.exit();
  });
