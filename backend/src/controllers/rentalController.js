const rentalService = require("../services/rentalService");

exports.createRental = async (req, res) => {

  try {

    const { product_id, qty, days } = req.body;

    const rental =
      await rentalService.createRental(
        req.user.id,
        product_id,
        qty,
        days
      );

    res.status(201).json({
      success: true,
      message: "Rental berhasil",
      data: rental
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// GET /rentals -> riwayat transaksi (isi berbeda tergantung role: penyewa atau owner)
exports.getRentalHistory = async (req, res) => {

  try {

    const rentals = await rentalService.getRentalHistory(
      req.user.id,
      req.user.role
    );

    res.json({
      success: true,
      message: "Riwayat transaksi berhasil diambil",
      data: rentals
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};