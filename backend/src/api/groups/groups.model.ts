import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Group = z.object({
    name: z.string()
})

export type Group = z.infer<typeof Group>;
export type GroupWithId = WithId<Group>;
export const Groups = db.collection<Group>('groups');
