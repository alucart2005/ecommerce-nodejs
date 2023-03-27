const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const purchases = await Purchase.findAll({
        include: [User, Product],
        where: {userId: req.user.id}
    });
    return res.json(purchases)
});

const purchaseCart = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where: {userId: req.user.id},
        attributes:['quantity', 'productId', 'userId'],
        raw: true
    });
    console.log(cart)
    await Purchase.bulkCreate(cart);
    await Cart.destroy({where: {userId: req.user.id}}); 
    return res.json(cart);
});

module.exports = {
    getAll,
    purchaseCart
}