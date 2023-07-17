import { ObjectId, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';


export const Student = z.object({

    full_name: z.string(),
    gender: z.enum(['m', 'w']),
    group_id: z.custom<ObjectId>(),
    // TODO: file with sign
});

export type Student = z.infer<typeof Student>;
export type StudentWithId = WithId<Student>;
export const Students = db.collection<Student>('students');
