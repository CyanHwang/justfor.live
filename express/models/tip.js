'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Tip.associate = function(models) {
    models.Tip.hasMany(models.Catalogue,{ as: 'catalogues' })
  };
  return Tip;
};