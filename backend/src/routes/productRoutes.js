const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const productController = require("../controllers/productController");

router.post(
  "/products",
  authMiddleware,
  roleMiddleware("owner"),
  productController.createProduct
);

router.get(
  "/products",
  authMiddleware,
  productController.getProducts
);

router.get(
  "/products/:id",
  authMiddleware,
  productController.getProductById
);

module.exports = router;