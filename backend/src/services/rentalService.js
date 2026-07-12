const sequelize = require("../config/database");

const Product = require("../models/Product");
const Rental = require("../models/Rental");
const User = require("../models/User");

exports.createRental = async (
  userId,
  productId,
  qty,
  days
) => {

  if (!qty || qty <= 0 || !days || days <= 0) {
    throw new Error("qty dan days harus lebih besar dari 0");
  }

  const transaction = await sequelize.transaction();

  try {

    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error("Product tidak ditemukan");
    }

    if (product.stock < qty) {
      throw new Error("Stock tidak cukup");
    }

    const totalPrice =
      product.price_per_day * qty * days;

    product.stock -= qty;

    await product.save({
      transaction
    });

    const rental = await Rental.create({
      user_id: userId,
      product_id: productId,
      qty,
      days,
      total_price: totalPrice
    }, {
      transaction
    });

    await transaction.commit();

    return rental;

  } catch (error) {

    await transaction.rollback();

    throw error;

  }

};

// Riwayat transaksi, dibedakan berdasarkan role:
// - penyewa -> hanya melihat rental miliknya sendiri
// - owner   -> melihat rental dari semua produk miliknya (barangnya disewa siapa saja)
exports.getRentalHistory = async (userId, role) => {

  const productInclude = {
    model: Product,
    as: "product",
    attributes: ["id", "name", "price_per_day"]
  };

  if (role === "owner") {

    return await Rental.findAll({
      include: [
        { ...productInclude, where: { owner_id: userId } },
        { model: User, as: "renter", attributes: ["id", "name", "email"] }
      ],
      order: [["id", "DESC"]]
    });

  }

  return await Rental.findAll({
    where: { user_id: userId },
    include: [productInclude],
    order: [["id", "DESC"]]
  });

};