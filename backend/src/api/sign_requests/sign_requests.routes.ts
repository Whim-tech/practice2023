import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as SignRequestHandlers from './sign_requests.handlers';
import { SignRequestDTO } from './sign_requests.model';

const router = Router();

router.get('/', SignRequestHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  SignRequestHandlers.findOne,
);
router.post(
  '/',
  validateRequest({
    body: SignRequestDTO,
  }),
  SignRequestHandlers.createOne,
);
// TODO: add another functionality
// router.put(
//   '/:id',
//   validateRequest({
//     params: ParamsWithId,
//     body: Todo,
//   }),
//   TodoHandlers.updateOne,
// );
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  SignRequestHandlers.deleteOne,
);

export default router;
