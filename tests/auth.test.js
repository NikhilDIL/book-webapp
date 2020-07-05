const request = require('supertest');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
let server;


describe('/api/users', () => {
    beforeEach(() => {server = require('../server'); });
    afterEach(async () => { server.close(); await User.deleteMany({});});

    describe('POST /', () => {
        it('should give res 400 status if any of the input fields are not valid',
        async () => {
            const res = await request(server)
                .post('/api/auth')
                .send({
                    email: "invalidemail",
                    password: "12345"
                });
            expect(res.status).toBe(400);
            expect(res.body.errors[0]).toHaveProperty('value', 'invalidemail');
        });

        it('should give res 400 status if invalid credentials',
        async () => {
            await request(server)
                .post('/api/users')
                .send({
                    username: "testman",
                    email: "testman@gmail.com",
                    password: "12345"
                });
            const res = await request(server)
            .post('/api/auth')
            .send({
                email: "testman@gmail.com",
                password: "wrongpassword"
            });
            expect(res.status).toBe(400);
        });
        
        it('should login a user and return valid json token',
        async () => {
            await request(server)
                .post('/api/users')
                .send({
                    username: "testman",
                    email: "testman@gmail.com",
                    password: "12345"
                });
            const res = await request(server)
            .post('/api/auth')
            .send({
                email: "testman@gmail.com",
                password: "12345"
            });
            expect(res.status).toBe(200);
            const decoded = jwt.verify(res.body, config.get('jwtPrivateKey'));
            expect(decoded).toHaveProperty('user');
        });
    })

});