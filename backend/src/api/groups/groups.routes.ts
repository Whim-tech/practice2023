import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as GroupHandlers from './groups.handlers';

const router = Router();

router.get('/', GroupHandlers.findAll);
router.get(
    '/:id',
    validateRequest({
        params: ParamsWithId,
    }),
    GroupHandlers.findOne,
);

export default router;