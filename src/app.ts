import bodyParser from 'body-parser';
import express from 'express';

import { anagrams } from './api/anagrams';
import { words } from './api/words';
import logger from './logger';


const app: express.Application = express();

const middleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { method, originalUrl, body } = req;
  const { statusCode,  } = res;

  logger.info(`Incoming Request: ${method}: ${originalUrl} ${body ? body : ''}`);
  logger.info(`Outgoing Response: ${statusCode}`);

  next();
}

function logErrors(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  logger.info('------------------------');
  logger.error(err);
  res.status(err.statusCode).send(err);
  // next(err);
}

app.use(middleware)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port: number = process.env.PORT ? +process.env.PORT : 3000;

app.use('/words.json', words);
app.use('/words', words);
app.use('/anagrams', anagrams);

app.use(logErrors);

app.listen(port, () => logger.info(`Express server bunyan listening on port ${port}`));