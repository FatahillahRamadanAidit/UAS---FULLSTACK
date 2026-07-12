const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rental = sequelize.define("rentals", {

  user_id: {
    type: DataTypes.INTEGER
  },

  product_id: {
    type: DataTypes.INTEGER
  },

  qty: {
    type: DataTypes.INTEGER
  },

  days: {
    type: DataTypes.INTEGER
  },

  total_price: {
    type: DataTypes.INTEGER
  }

});

module.exports = Rental;