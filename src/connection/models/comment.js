'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  comments.init({
    title: DataTypes.STRING,
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'comments',
    freezeTableName: true,
    name: {
      singular: 'comments',
      plural: 'comments'
    }
  });
  return comments;
};