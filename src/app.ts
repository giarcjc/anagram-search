import bodyParser from 'body-parser';
import express from 'express';
import { anagrams } from './api/anagrams';
import { words } from './api/words';
import errors from './errors';
import logger from './logger';
import middleware from './middleware';

const app: express.Application = express();

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