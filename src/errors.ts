import express from 'express';
import logger from './logger';

export default function logErrors(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  logger.error(err);
  res.status(err.statusCode).send(err);
}