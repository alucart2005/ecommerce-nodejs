const Category = require("./category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const User = require("./User");
const Cart = require("./Cart");


Product.belongsToMany(Category, { through: "ProductCategory" }); // categoryID
Category.belongsToMany(Product, { through: "ProductCategory" });


ProductImg.belongsTo(Product); // productID
Product.hasMany(ProductImg);

Cart.belongsTo(User); // userID
User.hasMany(Cart);

Cart.belongsTo(Product); // productID
Product.hasMany(Cart);


// Modelo1.belongsTo(Modelo2);
// Modelo2.hasMany(Modelo1);

// ProductImg.belongsToMany(Product, {through: "ProductImgProduct"}); // productID
// Product.belongsToMany(ProductImg, {through: "ProductImgProduct"});

