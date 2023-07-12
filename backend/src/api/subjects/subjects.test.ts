import request from 'supertest';

import app from '../../app';
import { Subjects } from './subjects.model';
import { ObjectId } from 'mongodb';


let id: ObjectId;
let name = "Math";
beforeAll(async () => {
    try {
        await Subjects.drop();

        const insertResult = await Subjects.insertOne({ name: name });
        id = insertResult.insertedId;
    } catch (error) { }
});

describe('GET /api/v1/subjects', () => {
    it('responds with an array of subjects', async () =>
        request(app)
            .get('/api/v1/subjects')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
            }),
    );
});

describe('GET /api/v1/subjects/:id',  () => {
    it('responds with a single subject', async () =>
        request(app)
            .get(`/api/v1/subjects/${id.toHexString()}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id.toHexString());
                expect(response.body).toHaveProperty('name');
                expect(response.body.name).toBe(name);
            }),
    );
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .get('/api/v1/subjects/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/subjects/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});