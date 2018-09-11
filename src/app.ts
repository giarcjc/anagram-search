import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { anagrams } from './api/anagrams';
import { words } from './api/words';

import { dbService } from './db/db.service';
import env from './environment';
import errors from './errors';
import {importService} from './import';
import logger from './logger';
import middleware from './middleware';

const app: express.Application = express();

const redisPort:number = env.REDIS_PORT ? +env.REDIS_PORT : 6379;
const redisHost: string = env.REDIS_HOST ? env.REDIS_HOST : '127.0.0.1';

dbService.connectToRedis(redisPort, redisHost);

const filePath: string = path.join(__dirname, '../dictionary.txt.gz');

// build the corpus by importing dictionary into db
if (filePath) {
  importService.streamToRedis(redisPort, redisHost, filePath);
}

// middleware - just logging right now
// must go before routes
app.use(middleware);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port: number = process.env.PORT ? +process.env.PORT : 3000;

app.use('/words.json', words);
app.use('/words', words);
app.use('/anagrams', anagrams);

// error logging - must go last
app.use(errors);

app.listen(port, () => logger.info(`Express server bunyan listening on port ${port}`));