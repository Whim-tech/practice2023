import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const obj_id_str = z.string().min(1).refine((val) => {
  try {
    return new ObjectId(val);
  } catch (error) {
    return false;
  }
}, {
  message: 'Invalid ObjectId',
});

export const ParamsWithId = z.object({
  id: obj_id_str,
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
