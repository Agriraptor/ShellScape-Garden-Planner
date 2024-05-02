const request = require('supertest');
const server = require('./../../server/server.js');
// const express = require('express');
// const app = express();
// const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    it('GET, responds with 200 status and text/html content type', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      it('/signup respond with 201 & res.locals.userCreated upon successful creation', async () => {
        const reqBody = {
          username: 'mock',
          password: 'mock',
        };
        const response = await request(server)
          .post('/user/signup')
          .send(reqBody)
          .set('Accept', 'application/json');

        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/application\/json/);
      });

      it('/login respond with 200 & res.locals.user upon successful creation', async () => {
        const reqBody = {
          username: 'mock',
          password: 'mock',
        };
        const response = await request(server)
          .post('/user/login')
          .send(reqBody)
          .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
      });
    });
  });

  describe('/plant', () => {
    it('mongodb fetch should work', async () => {
      const response = await request(server)
        .get('/plant?location=New+York')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });
});
