const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const User = require('../models/User');
require('../models')

let token;
let cartId;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('POST /cart should create one cart', async () => {
  const product = await Product.create({
    title: "Test Product",
    description: "Test Description",
    price: 1
  });
  const user = await User.create({
    "firstName": "Nombre1",
    "lastName": "Anaya1",
    "email": "nombre@emial.com",
    "password": "1234",
    "phone": "12345678"
  });
  const cart = {
    quantity: 2,
    productId: product.id,
    userId: user.id
  };
  const res = await request(app)
    .post('/cart')
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
  cartId = res.body.id;
  await product.destroy();
  await user.destroy();
  expect(res.statusCode).toBe(201);
  expect(res.body.quantity).toBe(cart.quantity);

});

test('GET /cart should return all carts', async () => {
  const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT /cart/:id should update one cart', async () => {
  const product = await Product.create({
    title: "Test Product",
    description: "Test Description",
    price: 1
  });
  const cart = {
    productId: product.id,
    quantity: 3,
  };
  const res = await request(app)
    .put(`/cart/${cartId}`)
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
  await product.destroy();
  expect(res.statusCode).toBe(200);
  // expect(res.body.quantity).toBe(cart.quantity);
});

test('DELETE /cart/:id should delete one cart', async () => {
  const res = await request(app)
    .delete(`/cart/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(204);
});