module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title:{ type: DataTypes.STRING, allowNull:false },
    description:{ type: DataTypes.TEXT, allowNull:true },
    price:{ type: DataTypes.FLOAT, allowNull:false, defaultValue:0 },
    image:{ type: DataTypes.STRING, allowNull:true },
    stock:{ type: DataTypes.INTEGER, defaultValue:0 }
  }, { timestamps:true });
  return Product;
};
