const request = require('supertest');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Book');
let server;
let user_res;
let book;
let decoded;

describe('/api/books', () => {
    beforeAll(async () => {
        server = require('../server');
        // create and add a new user to the users collection. returns x-auth-token
        user_res = await request(server)
        .post('/api/users')
        .send({
            username: "testman",
            email: "testman@gmail.com",
            password: "12345"
        });
        decoded = jwt.verify(user_res.body, config.get('jwtPrivateKey'));
        // insert a book into the table
        book = await request(server)
        .post('/api/books')
        .send({
            user: decoded.id,
            bookname: "Best Book",
            category: "not-read"
        })
        .set('x-auth-token', user_res.body);
    })
    afterAll(async () => { 
        server.close(); 
        await User.deleteMany({});
        await Book.deleteMany({});
    });

    describe('GET /', () => {
        it('get all of a logged in users\' books',
        async () => {
            const res = await request(server)
                .get('/api/books')
                .set('x-auth-token', user_res.body);
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        });
    });
    
    describe('POST /', () => {
        it('should add new book to table',
        async () => {
            const res = await request(server)
                .post('/api/books')
                .send({
                    user: decoded.id,
                    bookname: "Best Book",
                    category: "not-read"
                })
                .set('x-auth-token', user_res.body);
            expect(res.status).toBe(200);
        });
    });

    describe('PUT /:id', () => {
        it('should return res status 400 if book not found',
        async () => {
            const res = await request(server)
                .put('/api/books/'+mongoose.Types.ObjectId().toHexString())
                .set('x-auth-token', user_res.body)
            expect(res.status).toBe(400);
        });
        it('should update a book in table',
        async () => {
            const res = await request(server)
                .put('/api/books/' + book.body._id)
                .send({
                    category: "read"
                })
                .set('x-auth-token', user_res.body);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('category', 'read');
        });
    });

    describe('DELETE /:id', () => {
        it('should return res status 400 if book not found',
        async () => {
            const res = await request(server)
                .delete('/api/books/'+mongoose.Types.ObjectId().toHexString())
                .set('x-auth-token', user_res.body)
            expect(res.status).toBe(400);
        });

        it('should delete a book in the table',
        async () => {
            const res = await request(server)
                .delete('/api/books/'+book.body._id)
                .set('x-auth-token', user_res.body);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('msg', 'book removed');
        })
    })
});