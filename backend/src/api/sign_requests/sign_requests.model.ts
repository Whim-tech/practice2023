import { ObjectId, WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';
import { obj_id_str } from '../../interfaces/ParamsWithId';


export const SignRequestDTO = z.object({
    subject_id: obj_id_str,
    student_id: obj_id_str,
    lecturer_id: obj_id_str,
    is_signed: z.boolean().default(false),
});

// export const SignRequest = z.object({
//     subject_id: z.custom<ObjectId>(),
//     student_id: z.custom<ObjectId>(),
//     lecturer_id: z.custom<ObjectId>(),
//     is_signed: z.boolean(),
// });
// export type SignRequest = z.infer<typeof SignRequest>;


export type SignRequestDTO = z.infer<typeof SignRequestDTO>;
export type SignRequestWithId = WithId<SignRequestDTO>;
export const SignRequests = db.collection<SignRequestDTO>('sign_requests'); 
