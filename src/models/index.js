const Category = require("./category");
const Product = require("./Product");


Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });