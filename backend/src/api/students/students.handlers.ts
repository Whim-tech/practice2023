import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { StudentWithId, Students } from './students.model';

export async function findAll(req: Request, res: Response<StudentWithId[]>, next: NextFunction) {
    try {
        const students = await Students.find().toArray();
        res.json(students);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, StudentWithId, {}>, res: Response<StudentWithId>, next: NextFunction) {
    try {
        const result = await Students.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Student with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
