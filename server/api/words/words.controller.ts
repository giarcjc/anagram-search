import { NextFunction, Request, Response, Router} from 'express';
import { wordsService} from './words.service';

import { performance} from 'perf_hooks';
const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {

  performance.mark('startPOST');
  if (!req.body.words) {
    // TODO: use ajv for validation
    throw new Error('Expected request to have property "words"');
  }
  return wordsService.addToDataStore(req.body.words)
  .then((json: any) => {
    res.status(201).send(json);

  })
  .catch((err) => next(err));
});

router.delete('/:word.json', (req: Request, res: Response, next: NextFunction) => {
  return wordsService.removeWordFromDataStore(req.params.word)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => next(err));
});

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  return wordsService.dropDataStore()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => next(err));
});


export const words: Router = router;
