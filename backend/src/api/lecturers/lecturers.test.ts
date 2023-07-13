import request from 'supertest';

import app from '../../app';
import { Lecturers } from './lecturers.model';
import { ObjectId } from 'mongodb';


let id: ObjectId;
let full_name = "Fink Tatyana";
beforeAll(async () => {
    try {
        await Lecturers.drop();

        const insertResult = await Lecturers.insertOne({ full_name: full_name });
        id = insertResult.insertedId;
    } catch (error) { }
});

describe('GET /api/v1/lecturers', () => {
    it('responds with an array of lecturers', async () =>
        request(app)
            .get('/api/v1/lecturers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
            }),
    );
});

describe('GET /api/v1/lecturers/:id',  () => {
    it('responds with a single lecturer', async () =>
        request(app)
            .get(`/api/v1/lecturers/${id.toHexString()}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id.toHexString());
                expect(response.body).toHaveProperty('full_name');
                expect(response.body.full_name).toBe(full_name);
            }),
    );
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .get('/api/v1/lecturers/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/lecturers/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});