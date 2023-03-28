const catchError = require('../utils/catchError'); // importing custom function to handle errors
const Purchase = require('../models/Purchase'); // importing Purchase model
const User = require('../models/User'); // importing User model
const Product = require('../models/Product'); // importing Product model
const Cart = require('../models/Cart'); // importing Cart model

const getAll = catchError(async(req, res) => { // a function to get all purchases made by a user
    const purchases = await Purchase.findAll({ // using sequelize method to get all purchases
        include: [User, Product], // including User and Product models to fill the foreign keys
        where: {userId: req.user.id} // filtering purchases by user id
    });
    return res.json(purchases) // returning purchases
});

const purchaseCart = catchError(async(req, res) => { // a function to purchase all items in the cart
    const cart = await Cart.findAll({ // using sequelize method to get all items in the cart
        where: {userId: req.user.id}, // filtering cart items by user id
        attributes:['quantity', 'productId', 'userId'], // selecting only necessary columns
        raw: true // returning a plain object
    });
    console.log(cart) // loging cart items
    await Purchase.bulkCreate(cart); // using sequelize method to create multiple purchases
    await Cart.destroy({where: {userId: req.user.id}});  // using sequelize method to delete all items in the cart
    return res.json(cart); // returning cart items
});

module.exports = { // exporting functions
    getAll,
    purchaseCart
}