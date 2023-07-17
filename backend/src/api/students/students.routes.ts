import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as StudentHandlers from './students.handlers';

const router = Router();

router.get('/', StudentHandlers.findAll);
router.get(
    '/:id',
    validateRequest({
        params: ParamsWithId,
    }),
    StudentHandlers.findOne,
);

export default router;