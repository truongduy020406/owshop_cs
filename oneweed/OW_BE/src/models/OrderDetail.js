'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetail.init({
    OrderDetail_id: DataTypes.INTEGER,
    Product_id: DataTypes.STRING,
    quanlity: DataTypes.INTEGER,
    Order_id: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};