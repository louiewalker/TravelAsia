const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, enum: ['Event', 'Travel', 'Product'], required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  cart: [cartItemSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
