// backend/controllers/offerController.js
const Offer = require("../models/Offer");

// GET all offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD new offer
exports.addOffer = async (req, res) => {
  try {
    const { title, description, link, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newOffer = new Offer({
      title,
      description,
      link,
      category,
      image,
    });

    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
