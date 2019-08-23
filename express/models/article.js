'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Article.associate = function(models) {
    models.Article.belongsTo(models.Catalogue)
  };
  return Article;
};