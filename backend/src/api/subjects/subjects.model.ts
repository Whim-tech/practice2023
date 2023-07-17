import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Subject = z.object({
    name: z.string()
});


export type Subject = z.infer<typeof Subject>;
export type SubjectWithId = WithId<Subject>;
export const Subjects = db.collection<Subject>('subjects');