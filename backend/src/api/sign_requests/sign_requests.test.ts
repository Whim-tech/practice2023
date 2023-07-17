import request from 'supertest';

import app from '../../app';
import { SignRequests } from './sign_requests.model';
import { Groups } from '../groups/groups.model';
import { Subjects } from '../subjects/subjects.model';
import { Students } from '../students/students.model';
import { Lecturers } from '../lecturers/lecturers.model';

let id = '';
let subject_id = '';
let student_id = '';
let lecturer_id = '';

beforeAll(async () => {
    try {
        await SignRequests.drop();

        const insertedGroup = await Groups.insertOne({ name: "МО-201" });
        let group_id = insertedGroup.insertedId;

        const insertedSubject = await Subjects.insertOne({ name: "Math" });
        subject_id = insertedSubject.insertedId.toHexString();

        const insertedStudent = await Students.insertOne({
            full_name: "Denis Bukhalov",
            gender: "m",
            group_id: group_id,
        });
        student_id = insertedStudent.insertedId.toHexString();

        const insertedLecturer = await Lecturers.insertOne({ full_name: "Fink" });
        lecturer_id = insertedLecturer.insertedId.toHexString();

    } catch (error) { }
}, 100000);

afterAll(async () => {
    try {
        await SignRequests.drop();
        await Groups.drop();
        await Students.drop();
        await Subjects.drop();
        await Lecturers.drop();

    } catch (error) { }
})


describe('GET /api/v1/sign_requests', () => {
    it('responds with an array of sign_requests', async () =>
        request(app)
            .get('/api/v1/sign_requests')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
            }),
    );
});


describe('POST /api/v1/sign_requests', () => {
    it('responds with an error if the sign_requests is invalid', async () =>
        request(app)
            .post('/api/v1/sign_requests')
            .set('Accept', 'application/json')
            .send({
                content: '',
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );
    it('responds with a not found if some of id is invalid', async () =>
        request(app)
            .post('/api/v1/sign_requests')
            .set('Accept', 'application/json')
            .send({
                subject_id: "6306d061477bdb46f9c57fa4",
                student_id: student_id,
                lecturer_id: lecturer_id,
                is_signed: false
            })
            .expect('Content-Type', /json/)
            .expect(404)
    );
    it('responds with an inserted object', async () =>
        request(app)
            .post('/api/v1/sign_requests')
            .set('Accept', 'application/json')
            .send({
                subject_id: subject_id,
                student_id: student_id,
                lecturer_id: lecturer_id
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                id = response.body._id;
                expect(response.body).toHaveProperty('subject_id');
                expect(response.body.subject_id).toBe(subject_id);
                expect(response.body).toHaveProperty('student_id');
                expect(response.body.student_id).toBe(student_id);
                expect(response.body).toHaveProperty('lecturer_id');
                expect(response.body.lecturer_id).toBe(lecturer_id);
                expect(response.body).toHaveProperty('is_signed');
                expect(response.body.is_signed).toBe(false);

            }),
    );
});

describe('GET /api/v1/sign_requests/:id', () => {
    it('responds with a single sign_requests', async () =>
        request(app)
            .get(`/api/v1/sign_requests/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('subject_id');
                expect(response.body.subject_id).toBe(subject_id);
                expect(response.body).toHaveProperty('student_id');
                expect(response.body.student_id).toBe(student_id);
                expect(response.body).toHaveProperty('lecturer_id');
                expect(response.body.lecturer_id).toBe(lecturer_id);
                expect(response.body).toHaveProperty('is_signed');
                expect(response.body.is_signed).toBe(false);
            }),
    );
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .get('/api/v1/sign_requests/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/sign_requests/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('DELETE /api/v1/sign_requests/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .delete('/api/v1/sign_requests/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .delete('/api/v1/sign_requests/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a 204 status code', (done) => {
        request(app)
            .delete(`/api/v1/sign_requests/${id}`)
            .expect(204, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get(`/api/v1/sign_requests/${id}`)
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});