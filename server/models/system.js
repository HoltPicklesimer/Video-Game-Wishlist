const mongoose = require("mongoose");

const systemSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  wanted: { type: Boolean, required: true },
  have: { type: Boolean, required: true },
  imageUrl: { type: String },
  developer: { type: String },
});

module.exports = mongoose.model("System", systemSchema);
