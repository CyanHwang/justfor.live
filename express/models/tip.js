'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Tip.associate = function(models) {
    // associations can be defined here
  };
  return Tip;
};