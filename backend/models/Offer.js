const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    link: { type: String, required: true },
    category: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
