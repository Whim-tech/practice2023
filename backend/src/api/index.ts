import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import todos from './todos/todos.routes';
import subjects from './subjects/subjects.routes'
import groups from './groups/groups.routes'
import students from './students/students.routes'
import lecturers from './lecturers/lecturers.routes'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API is alive',
  });
});

router.use('/todos', todos);
router.use('/subjects', subjects);
router.use('/groups', groups);
router.use('/students', students);
router.use('/lecturers', lecturers);

export default router;
