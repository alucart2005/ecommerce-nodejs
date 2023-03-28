const request = require('supertest');
const app = require('../app');
require ('../models')

let userId;
let token;

test('POST /users should create a user', async () => {
  const newUser = {
    "firstName": "Nombre1",
    "lastName": "Anaya1",
    "email": "nombre@emial.com",
    "password": "1234",
    "phone": "12345678"
  };
  const res = await request(app)
    .post('/users')
    .send(newUser);
  userId = res.body.id;
  expect(res.statusCode).toEqual(201);
  expect(res.body.email).toBe(newUser.email);
});

test('POST /users/login should de login', async () => {
  const user = {
    "email": "nombre@emial.com",
    "password": "1234",
  };
  const res = await request(app)
    .post('/users/login')
    .send(user);
  token = res.body.token;  
  expect(res.statusCode).toBe(200);
  expect(res.body.user.email).toBe(user.email);
  expect(res.body.token).toBeDefined();

});

test('POST /users/login with invalid credentials should return 401', async () => {
  const user = {
    "email": "nombre@emial.com",
    "password": "12345",
  };
  const res = await request(app)
    .post('/users/login')
    .send(user);
  expect(res.status).toBe(401);
});

test('GET /users  should return all users', async () => {
  const res = await request(app)
  .get('/users')
  .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(2);
});

test('PUT /users/:id should update one user', async () => {
  const newUser = {
    "firstName": "Nombre1",
    "lastName": "Anaya1",
    "email": "nombre@emial.com",
    "password": "1234",
    "phone": "12345678"
  };
  const res = await request(app)
    .put(`/users/${userId}`)
    .send(newUser)
    .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body.firstName).toBe(newUser.firstName);
  expect(res.body.lastName).toBe(newUser.lastName);
});

test('DELETE /users/:id should delete one user', async () => {
  const res = await request(app)
  .delete(`/users/${userId}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(204);
});

