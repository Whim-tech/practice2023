import request from 'supertest';

import app from '../../app';
import { Students, Student} from './students.model';
import { ObjectId } from 'mongodb';
import { Groups } from '../groups/groups.model';


let id: string;
let full_name = "Denis Bukhalov Vladimirovich";
let gender = Student.shape.gender.enum.m;
let group_id: ObjectId;
beforeAll(async () => {
    try {
        await Students.drop();
        
        const insertedGroup = await Groups.insertOne({ name: "МО-201" });
        group_id = insertedGroup.insertedId;

        const insertResult = await Students.insertOne({
            full_name: full_name,
            gender: gender,
            group_id: insertedGroup.insertedId,
        });
        id = insertResult.insertedId.toHexString();
    } catch (error) { }
});

describe('GET /api/v1/students', () => {
    it('responds with an array of students', async () =>
        request(app)
            .get('/api/v1/students')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
            }),
    );
});

describe('GET /api/v1/students/:id',  () => {
    it('responds with a single student', async () =>
        request(app)
            .get(`/api/v1/students/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('full_name');
                expect(response.body.full_name).toBe(full_name);
                expect(response.body).toHaveProperty('gender');
                expect(response.body.gender).toBe(gender);
                expect(response.body).toHaveProperty('group_id');
                expect(response.body.group_id).toBe(group_id.toHexString());
            }),
    );
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .get('/api/v1/students/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/students/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});