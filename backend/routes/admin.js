const express = require("express");
const router = express.Router();
const multer = require("multer");

// ✅ Import addOffer from controller
const { addOffer } = require("../controllers/offerController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Admin route to add an offer
router.post("/add-offer", upload.single("image"), addOffer);

module.exports = router;
