import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as SubjectHandlers from './subjects.handlers';

const router = Router();

router.get('/', SubjectHandlers.findAll);
router.get(
    '/:id',
    validateRequest({
        params: ParamsWithId,
    }),
    SubjectHandlers.findOne,
);
// router.get(
//     '/:name',
//     validateRequest({
//         params: ParamsWithId,
//     }),
//     SubjectHandlers.findOneByName,
// );

export default router;