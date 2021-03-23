const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  wanted: { type: Boolean, required: true },
  have: { type: Boolean, required: true },
  description: { type: String },
  imageUrl: { type: String },
  developer: { type: String, ref: "Developer" },
  genre: { type: String, ref: "Genre" },
  systems: [{ type: mongoose.Schema.Types.ObjectId, ref: "System" }],
});

module.exports = mongoose.model("Game", gameSchema);
