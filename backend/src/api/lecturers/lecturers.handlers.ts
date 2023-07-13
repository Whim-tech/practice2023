import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { LecturerWithId, Lecturers } from './lecturers.model';

export async function findAll(req: Request, res: Response<LecturerWithId[]>, next: NextFunction) {
    try {
        const lecturers = await Lecturers.find().toArray();
        res.json(lecturers);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, LecturerWithId, {}>, res: Response<LecturerWithId>, next: NextFunction) {
    try {
        const result = await Lecturers.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Lecturer with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
