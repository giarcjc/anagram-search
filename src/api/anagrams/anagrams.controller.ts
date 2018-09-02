import { NextFunction, Request, Response, Router } from 'express';
import { anagramsService } from './anagrams.service';

const router: Router = Router();

/**
 * This endpoint should support an optional query param
 * that indicates the maximum number of results to return.
 */

router.get('/:word.json', (req: Request, res: Response, next: NextFunction) => {
  return anagramsService.getAnagrams(req.params.word, req.query.limit)
    .then((json: any) => {res.send(json)
    })
    .catch((err: any) => next(err));
});

export const anagrams: Router = router;