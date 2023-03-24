const Category = require("./category");
const Product = require("./Product");


Product.belongsToMany(Category, { through: "ProductCategory" }); // categoryID
Category.belongsToMany(Product, { through: "ProductCategory" });