const express = require('express');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const userRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter)


module.exports = router;