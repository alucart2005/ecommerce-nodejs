const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const User = require("./User");
const Cart = require("./Cart");
const Purchase = require("./Purchase");


Product.belongsToMany(Category, { through: "ProductCategory" }); // categoryID
Category.belongsToMany(Product, { through: "ProductCategory" });


ProductImg.belongsTo(Product); // productID
Product.hasMany(ProductImg);

Cart.belongsTo(User); // userID
User.hasMany(Cart);

Cart.belongsTo(Product); // productID
Product.hasMany(Cart);

Purchase.belongsTo(User); // userID
User.hasMany(Purchase);

Purchase.belongsTo(Product); // productID
Product.hasMany(Purchase);


// Modelo1.belongsTo(Modelo2);
// Modelo2.hasMany(Modelo1);

// ProductImg.belongsToMany(Product, {through: "ProductImgProduct"}); // productID
// Product.belongsToMany(ProductImg, {through: "ProductImgProduct"});

