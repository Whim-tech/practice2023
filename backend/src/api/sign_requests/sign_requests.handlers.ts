import { Response, Request, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { SignRequestWithId, SignRequests, SignRequestDTO } from './sign_requests.model';
import { Students } from '../students/students.model';
import { Lecturers } from '../lecturers/lecturers.model';
import { Subjects } from '../subjects/subjects.model';

export async function findAll(req: Request, res: Response<SignRequestWithId[]>, next: NextFunction) {
    try {
        const signResults = await SignRequests.find().toArray();
        res.json(signResults);
    } catch (error) {
        next(error);
    }
}

export async function createOne(req: Request<{}, SignRequestWithId, SignRequestDTO>, res: Response<SignRequestWithId>, next: NextFunction) {
    try {
        let is_student_exist = await Students.findOne({
            _id: new ObjectId(req.body.student_id),
        });

        let is_lecturer_exist = await Lecturers.findOne({
            _id: new ObjectId(req.body.lecturer_id),
        });

        let is_subject_exist = await Subjects.findOne({
            _id: new ObjectId(req.body.subject_id),
        });
        if (!is_lecturer_exist || !is_student_exist || !is_subject_exist) {
            res.status(404);
            throw new Error(`Cannot create SignRequest with student="${req.body.student_id}", lecturer="${req.body.lecturer_id}", subject="${req.body.subject_id}"`);
        }

        const insertResult = await SignRequests.insertOne(req.body);
        if (!insertResult.acknowledged) throw new Error('Error inserting SignRequest.');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,

        });
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, SignRequestWithId, {}>, res: Response<SignRequestWithId>, next: NextFunction) {
    try {
        const result = await SignRequests.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`SignRequest with id "${req.params.id}" not found.`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

// TODO: change to signup_request
// export async function updateOne(req: Request<ParamsWithId, SignRequestWithId, SignRequest>, res: Response<SignRequestWithId>, next: NextFunction) {
//     try {
//         const result = await SignRequests.findOneAndUpdate({
//             _id: new ObjectId(req.params.id),
//         }, {
//             $set: req.body,
//         }, {
//             returnDocument: 'after',
//         });
//         if (!result.value) {
//             res.status(404);
//             throw new Error(`SignRequest with id "${req.params.id}" not found.`);
//         }
//         res.json(result.value);
//     } catch (error) {
//         next(error);
//     }
// }

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const result = await SignRequests.findOneAndDelete({
            _id: new ObjectId(req.params.id),
        });
        if (!result.value) {
            res.status(404);
            throw new Error(`SignRequest with id "${req.params.id}" not found. reee`);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}