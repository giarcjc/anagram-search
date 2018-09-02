import bodyParser from 'body-parser';
import express from 'express';

// import bunyanMiddleware from 'bunyan-middleware';
import { anagrams } from './api/anagrams';
import { words } from './api/words';
import logger from './logger';


const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port: number = process.env.PORT ? +process.env.PORT : 3000;

app.use('/words.json', words);
app.use('/words', words);
app.use('/anagrams', anagrams);

app.listen(port, () => logger.info(`Express server bunyan listening on port ${port}`));