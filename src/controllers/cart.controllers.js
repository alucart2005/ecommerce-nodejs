const catchError = require('../utils/catchError'); // Import catchError function from utils folder
const Cart = require('../models/Cart'); // Import Cart Model
const Product = require('../models/Product'); // Import Product Model
const User = require('../models/User'); // Import User Model

// This function will be called when a request to get all the carts is made
const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    // Find all carts of the user and include the product and user data in the response
    const results = await Cart.findAll({
        include: [Product, User],
        where: {userId}
    });
    return res.json(results);
});

// This function will be called when a request to create a cart is made
const create = catchError(async(req, res) => {
    const {productId, quantity} = req.body;
    const userId = req.user.id;
    // Create a new cart
    const result = await Cart.create({productId, quantity, userId});
    return res.status(201).json(result);
});

// This function will be called when a request to get a specific cart is made
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    // Find the cart by the id and include the product and user data in the response
    const result = await Cart.findByPk(id, {include: [Product, User]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

// This function will be called when a request to delete a specific cart is made
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    // Delete the cart by the id
    await Cart.destroy({ where: {id} });
    return res.sendStatus(204);
});

// This function will be called when a request to update a specific cart is made
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {productId, quantity} = req.body;
    const userId = req.user.id;
    // Update the cart by the id and include the product and user data in the response
    const result = await Cart.update(
        {productId, quantity, userId},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}