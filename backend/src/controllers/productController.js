const Product = require("../models/Product");
const User = require("../models/User");

exports.createProduct = async (req, res) => {

  try {

    const { name, price_per_day, stock, status } = req.body;

    if (!name || !price_per_day || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, price_per_day, dan stock wajib diisi"
      });
    }

    const product = await Product.create({
      name,
      price_per_day,
      stock,
      status: status || "available",
      owner_id: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// GET /products -> semua user login bisa lihat daftar produk yang tersedia
exports.getProducts = async (req, res) => {

  try {

    const products = await Product.findAll({
      include: [{ model: User, as: "owner", attributes: ["id", "name"] }],
      order: [["id", "DESC"]]
    });

    res.json({
      success: true,
      message: "Daftar produk berhasil diambil",
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// GET /products/:id -> detail satu produk
exports.getProductById = async (req, res) => {

  try {

    const product = await Product.findByPk(req.params.id, {
      include: [{ model: User, as: "owner", attributes: ["id", "name"] }]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product tidak ditemukan"
      });
    }

    res.json({
      success: true,
      message: "Detail produk berhasil diambil",
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};