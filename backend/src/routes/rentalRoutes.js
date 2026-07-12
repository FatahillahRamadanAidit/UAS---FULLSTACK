const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const rentalController =
require("../controllers/rentalController");

router.post(
  "/rentals",
  authMiddleware,
  rentalController.createRental
);

router.get(
  "/rentals",
  authMiddleware,
  rentalController.getRentalHistory
);

module.exports = router;