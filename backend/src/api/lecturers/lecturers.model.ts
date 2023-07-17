import { ObjectId, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';


export const Lecturer = z.object({

    full_name: z.string(),

});

export type Lecturer = z.infer<typeof Lecturer>;
export type LecturerWithId = WithId<Lecturer>;
export const Lecturers = db.collection<Lecturer>('lecturers');