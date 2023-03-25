const Category = require("./category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");


Product.belongsToMany(Category, { through: "ProductCategory" }); // categoryID
Category.belongsToMany(Product, { through: "ProductCategory" });

ProductImg.belongsTo(Product); // productID
Product.hasMany(ProductImg);

