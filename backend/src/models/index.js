const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

// Models
const User = require('./user')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);

// Associations
User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(Order);
Order.belongsTo(Product);
// alias for eager loading
Order.belongsTo(Product, { as: 'Product', foreignKey: 'ProductId' });

module.exports = { sequelize, Sequelize, User, Product, Order };
