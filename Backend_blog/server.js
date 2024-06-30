const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require('./routes/authRoute'); // Import authRoutes
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://vecros-full-stack.vercel.app", // Allow requests from this origin
  credentials: true, // Allow sending cookies with the request
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes); // Use authRoutes for authentication endpoints
app.use('/api/blogs', blogRoutes);

// Handle 404 errors - this should be placed after all your routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

// Existing POST endpoint
app.post("/api/hell", (req, res) => {
  const { name, age } = req.body;
  console.log("Received data:", { name, age });
  res.status(200).json({ message: "Data received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
