import request from 'supertest';

import app from '../../app';
import { Groups } from './groups.model';
import { ObjectId } from 'mongodb';


let id: ObjectId;
let name = "MO-181";
beforeAll(async () => {
    try {
        await Groups.drop();
    

        const insertResult = await Groups.insertOne({ name: name });
        id = insertResult.insertedId;
    } catch (error) { }
});

describe('GET /api/v1/groups', () => {
    it('responds with an array of groups', async () =>
        request(app)
            .get('/api/v1/groups')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
            }),
    );
});

describe('GET /api/v1/groups/:id',  () => {
    it('responds with a single group', async () =>
        request(app)
            .get(`/api/v1/groups/${id.toHexString()}`)
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
            .get('/api/v1/groups/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/groups/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});