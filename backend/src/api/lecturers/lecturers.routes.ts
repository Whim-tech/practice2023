import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { validateRequest } from '../../middlewares';
import * as LecturerHandlers from './lecturers.handlers';

const router = Router();

router.get('/', LecturerHandlers.findAll);
router.get(
    '/:id',
    validateRequest({
        params: ParamsWithId,
    }),
    LecturerHandlers.findOne,
);

export default router;