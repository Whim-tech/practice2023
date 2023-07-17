import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { GroupWithId, Groups } from './groups.model';

export async function findAll(req: Request, res: Response<GroupWithId[]>, next: NextFunction) {
    try {
        const groups = await Groups.find().toArray();
        res.json(groups);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, GroupWithId, {}>, res: Response<GroupWithId>, next: NextFunction) {
    try {
        const result = await Groups.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Group with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
