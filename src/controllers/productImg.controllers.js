const catchError = require('../utils/catchError'); // import the catchError function from the utils folder
const ProductImg = require('../models/ProductImg'); // import the ProductImg model
const fs = require('fs'); // import the fs module
const path = require('path'); // import the path module

// this function will get all the images from the database
const getAll = catchError(async(req, res) => { // the catchError function allows us to catch any errors that occur in the function
    const results = await ProductImg.findAll(); // use the findAll method to get all the images from the database
    return res.json(results); // return the results in json format
});

// this function will add a new image to the database
const create = catchError(async(req, res) => {
    // the url will be the protocol (http or https) + the host (localhost) + the path to the uploads folder + the name of the file
    const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;
	const filename = req.file.filename; // the filename will be the name of the file
    const result = await ProductImg.create({ url, filename }); // use the create method to add the image to the database
    return res.status(201).json(result); // return the result in json format
});

// this function will remove an image from the database
const remove = catchError(async(req, res) => {
    const { id } = req.params; // get the id from the request parameters
    const image = await ProductImg.findByPk(id); // find the image by the id
		if(!image) return res.sendStatus(404); // if the image is not found, send a 404 status code
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', image.filename)); // delete the file
    await image.destroy(); // delete the image from the database
    return res.sendStatus(204); // send a 204 status code
});

module.exports = {
    getAll,
    create,
    remove,
}