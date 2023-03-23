const request = require('supertest');
const app = require('../app');

let userId;
let token;

test('POST /users', async () => {
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

test('GET /users', async () => {
  const res = await request(app)
  .get('/users')
  .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT /users/:id', async () => {
  const newUser = {
    "firstName": "Nombre1",
    "lastName": "Anaya1",
    "email": "nombre@emial.com",
    "password": "1234",
    "phone": "12345678"
  };
  const res = await request(app)
    .put(`/users/${userId}`)
    .send(newUser);
  expect(res.statusCode).toEqual(200);
  expect(res.body.firstName).toBe(newUser.firstName);
  expect(res.body.lastName).toBe(newUser.lastName);
});

test('LOGIN /users/login', async () => {
  const user = {
    "email": "nombre@emial.com",
    "password": "1234",
  };
  const res = await request(app)
    .post('/users/login')
    .send(user);
  expect(res.statusCode).toBe(200);
  expect(res.body.user.email).toBe(user.email);
  expect(res.body.token).toBeDefined();

});

test('POST /users/login', async () => {
  const user = {
    "email": "nombre@emial.com",
    "password": "12345",
  };
  const res = await request(app)
    .post('/users/login')
    .send(user);
  expect(res.status).toBe(401);

});

test('DELETE /users/:id', async () => {
  const res = await request(app).delete(`/users/${userId}`);
  expect(res.statusCode).toBe(204);
});

