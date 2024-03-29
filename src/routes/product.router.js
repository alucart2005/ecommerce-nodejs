const { getAll, create, getOne, remove, update, setProductCategory, setProductProductImg } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

productRouter.route('/:id/categories')
    .post(verifyJWT, setProductCategory)

productRouter.route('/:id/product_images')
    .post(verifyJWT, setProductProductImg)

module.exports = productRouter;
