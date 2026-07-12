const User = require("./User");
const Product = require("./Product");
const Rental = require("./Rental");

// Seorang owner (User) memiliki banyak Product
User.hasMany(Product, { foreignKey: "owner_id", as: "products" });
Product.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

// Seorang penyewa (User) memiliki banyak Rental
User.hasMany(Rental, { foreignKey: "user_id", as: "rentals" });
Rental.belongsTo(User, { foreignKey: "user_id", as: "renter" });

// Sebuah Product memiliki banyak Rental (riwayat sewa)
Product.hasMany(Rental, { foreignKey: "product_id", as: "rentals" });
Rental.belongsTo(Product, { foreignKey: "product_id", as: "product" });

module.exports = { User, Product, Rental };
