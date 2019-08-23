'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    sex: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};