const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default_avatar.jpg", // Example default avatar path
  },
  author: { 
    type: String, 
    required: true }
});

module.exports = mongoose.model("User", userSchema);
