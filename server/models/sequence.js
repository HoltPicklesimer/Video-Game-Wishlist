const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxGameId: { type: Number, required: true },
  maxSystemId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
