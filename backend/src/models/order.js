module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity:{ type: DataTypes.INTEGER, defaultValue:1 },
    total:{ type: DataTypes.FLOAT, defaultValue:0 }
  }, { timestamps:true });
  return Order;
};
