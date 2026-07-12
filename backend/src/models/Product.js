  const { DataTypes } = require("sequelize");
  const sequelize = require("../config/database");

  const Product = sequelize.define("products", {

    owner_id: {
      type: DataTypes.INTEGER
    },

    name: {
      type: DataTypes.STRING
    },

    price_per_day: {
      type: DataTypes.INTEGER
    },

    stock: {
      type: DataTypes.INTEGER
    },

    status: {
      type: DataTypes.STRING
    }

  });

  module.exports = Product;