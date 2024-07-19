import request from 'supertest';

import app from '../index';

let GlobalId: null = null

let mockUser = {
    "name": "test",
    "bankAccount": '123'
}
describe('Users API', () => {

    it('should create a new user', async () => {
        const response = (await request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(mockUser)
        );

        GlobalId = response.body.id

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'test');
    });

    it('should login a user', async () => {
        const response = await request(app)
            .put('/api/users/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                id: GlobalId
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User is successfully logged in');
    });

    it('should logout a user', async () => {
        const response = await request(app)
            .put('/api/users/logout')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                id: GlobalId
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User is successfully logged out');
    });

    it('should fetch a user by ID', async () => {
        const userId = GlobalId;

        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'test');
    });

    it('should cashout a user', async () => {
        const response = await request(app)
            .put('/api/users/cashout')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                id: GlobalId
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User is successfully cashout');
    });

    it('should not cashout a user', async () => {
        const response = await request(app)
            .put('/api/users/cashout')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                id: GlobalId
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Low Balance');
    });

    it('should fetch user history by ID', async () => {
        const userId = GlobalId;
        const response = await request(app).get(`/api/users/history/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
    });

    it('should delete a user', async () => {
        const userId = GlobalId;
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(204);
    });

});
