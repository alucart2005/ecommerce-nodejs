const catchError = require('../utils/catchError'); // catch any error that might happen
const Category = require('../models/Category'); // get the category model
const Product = require('../models/Product'); // get the product model

// GET /api/categories
const getAll = catchError(async(req, res) => {
    // Get all the categories and include the related products
    const results = await Category.findAll({ include: Product });
    return res.json(results);
});

// POST /api/categories
const create = catchError(async(req, res) => {
    // Create a new category
    const result = await Category .create(req.body);
    return res.status(201).json(result);
});

// GET /api/categories/:id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    // Find a category by its id
    const result = await Category .findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

// DELETE /api/categories/:id
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    // Destroy the category by its id
    await Category.destroy({ where: {id} });
    return res.sendStatus(204);
});

// PUT /api/categories/:id
const update = catchError(async(req, res) => {
    const { id } = req.params;
    // Update the category by its id
    const result = await Category .update(
        req.body,
        { where: {id}, returning: true }
    );
    // If the category was not found, return a 404
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