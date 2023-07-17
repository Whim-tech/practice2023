import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { SubjectWithId, Subjects } from './subjects.model';

export async function findAll(req: Request, res: Response<SubjectWithId[]>, next: NextFunction) {
    try {
        const subjects = await Subjects.find().toArray();
        res.json(subjects);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, SubjectWithId, {}>, res: Response<SubjectWithId>, next: NextFunction) {
    try {
        const result = await Subjects.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Subject with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

// dont check for if name is exist
// export async function findOneByName(req: Request, res: Response<SubjectWithId>, next: NextFunction) {
//     try {
//         const result = await Subjects.findOne({
//             name: req.params.name,
//         });
//         if (!result) {
//             res.status(404);
//             throw new Error(`Subject with name "${req.params.name}" not found.`);
//         }
//         res.json(result);
//     } catch (error) {
//         next(error);
//     }
// }