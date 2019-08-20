'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catalogue = sequelize.define('Catalogue', {
    title: DataTypes.STRING,
    TipId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Catalogue.associate = function(models) {
    models.Catalogue.belongsTo(models.Tip)
  };
  return Catalogue;
};