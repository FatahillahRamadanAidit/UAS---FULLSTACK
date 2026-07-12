// Dipanggil ketika route tidak ditemukan
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
};

// Error handler terpusat (harus 4 parameter agar dikenali Express sebagai error middleware)
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server"
  });
};

module.exports = { notFound, errorHandler };
