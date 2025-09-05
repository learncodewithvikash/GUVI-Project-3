module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type: DataTypes.STRING, allowNull:false },
    email:{ type: DataTypes.STRING, allowNull:false, unique:true },
    password:{ type: DataTypes.STRING, allowNull:false },
    isAdmin:{ type: DataTypes.BOOLEAN, defaultValue:false }
  }, { timestamps:true });
  return User;
};
