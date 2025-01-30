require("dotenv").config(); // Laddar .env-filen

const mongoose = require("mongoose");

const mongoURI = process.env.envCopyMONGO_URI; // Hämtar värdet från .env
const jwtSecret = process.env.JWT_SECRET;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Ansluten till MongoDB"))
  .catch((err) => console.log("MongoDB-anslutning misslyckades", err));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Anslut till databas
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
