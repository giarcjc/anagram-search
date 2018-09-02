import bodyParser from 'body-parser';
import express from 'express';
import {NextFunction, Request, Response } from 'express';

const app: express.Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port: number = process.env.PORT ? +process.env.PORT : 3000;
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(200);
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));