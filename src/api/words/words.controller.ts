import Ajv from 'ajv';
import { NextFunction, Request, Response, Router} from 'express';
import { wordsService} from './words.service';

const ajv = new Ajv();
const schema = {
  "maxProperties": 1,
  "properties": {
    "words": {
      "items": [
       { "type":"string"}
      ],
       "type": "array",
    }
  },
  "required":["words"],
  "type": "object"
};

const validate = ajv.compile(schema)

const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {

  if (!validate(req.body)) {
    const errorMsg =(validate.errors && validate.errors.length) ? validate.errors[0].message : 'Error: Invalid Parameters';
    const error = { statusCode: 400, message: errorMsg};
    next(error);
    return;
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
