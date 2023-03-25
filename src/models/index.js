const Category = require("./category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");


Product.belongsToMany(Category, { through: "ProductCategory" }); // categoryID
Category.belongsToMany(Product, { through: "ProductCategory" });

ProductImg.belongsToMany(Product, {through: "ProductImgProduct"}); // productID
Product.belongsToMany(ProductImg, {through: "ProductImgProduct"});

