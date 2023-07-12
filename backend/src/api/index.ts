import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import todos from './todos/todos.routes';
import subjects from './subjects/subjects.routes'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API is alive',
  });
});

router.use('/todos', todos);
router.use('/subjects', subjects);

export default router;
