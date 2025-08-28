const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getOffers, addOffer } = require("../controllers/offerController");

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/offers", getOffers);
router.post("/offers", upload.single("image"), addOffer);

module.exports = router;
