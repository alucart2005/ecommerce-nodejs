const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
require('../models')

let token;
let productID;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('POST /products', async () => {
    const newProduct = {
        title: "Test Product",
        description: "Test Description",
        price: 1
    };
    const res = await request(app)
        .post('/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`);
    productID = res.body.id;
    expect(res.statusCode).toEqual(201);
});

test('GET /products', async () => {
    const res = await request(app)
        .get('/products')
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Test Product");
    expect(res.body[0].categories).toBeDefined();
    expect(res.body[0].productImgs).toBeDefined();
});

test('GET /products/:id', async () => {
    const res = await request(app)
        .get(`/products/${productID}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test Product");
    expect(res.body.categories).toBeDefined();
    expect(res.body.productImgs).toBeDefined();
});

test('PUT /products/:id', async () => {
  const newProduct = {
    title: "Test Product",
    description: "Test Description",
    price: 1
  };
  const res = await request(app)
    .put(`/products/${productID}`)
    .send(newProduct)
    .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});

test('POST /products/:id/categories', async () => {
    const newCategory = await Category.create({name: "Test Category"});
    const res = await request(app)
    .post(`/products/${productID}/categories`)
    .send([newCategory.id])
    .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Test Category");
    
});


test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${productID}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
});



