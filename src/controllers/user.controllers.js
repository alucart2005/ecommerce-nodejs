const catchError = require('../utils/catchError'); // Import the catchError function from the utils directory
const User = require('../models/User'); // Import the User model from the models directory
const bcrypt = require('bcrypt'); // Import the bcrypt library
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password;
    delete req.body.email;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: '1w'}
    )
    return res.json({user, token});
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}