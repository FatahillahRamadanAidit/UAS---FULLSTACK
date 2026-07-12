const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/associations");

const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");

const rentalRoutes = require("./routes/rentalRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", rentalRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Eco-Share Backend API Running"
  });
});

app.use(notFound);
app.use(errorHandler);

sequelize.sync()
.then(() => {
  console.log("Database Connected");
})
.catch((err) => {
  console.log("Database Error:", err.message);
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});