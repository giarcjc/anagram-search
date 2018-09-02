import express from 'express';
import logger from './logger';

export default function middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { method, originalUrl, body } = req;
  const { statusCode,  } = res;

  logger.info(`Incoming Request: ${method}: ${originalUrl} ${body ? body : ''}`);
  logger.info(`Outgoing Response: ${statusCode}`);

  next();
}

