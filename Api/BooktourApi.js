const express = require("express");
const BookTour = require("../Schemas/BookTour");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_Key;
const fetchuser = require("../middleware/fetchdata");

const router2 = express.Router();

// < ------------------------------ API for booking tour ------------------------------ >
router2.post("/tourbooked", fetchuser, async (req, res) => {
  const {
    name,
    email,
    phone,
    adults,
    childs,
    tourId,
    title,
    description,
    img,
    price,
    stayTime,
    city,
  } = req.body;
  try {
    let tour = await BookTour.findOne({ email, tourId });
    if (tour) {
      return res
        .status(400)
        .json({ error: "Tour Already booked, please try other tour!" });
    }
    tour = new BookTour({
      name,
      email,
      phone,
      adults,
      childs,
      user: req.user.userId,
      tourId,
      title,
      description,
      img,
      price,
      stayTime,
      city,
    });
    const savedTour = await tour.save();
    res.json({ savedTour, user: req.user.userId });
  } catch (error) {
    return res.status(400).json({
      error: "Tour Couldn't be booked, please try again!",
      error: error.message,
    });
  }
});

// < ------------------------------ API for get all tours ------------------------------ >
router2.get("/getalltours", fetchuser, async (req, res) => {
  try {
    let tours = await BookTour.find({ user: req.user.userId });
    if (!tours) {
      return res
        .status(400)
        .json({ error: "No tours found, please book a tour and try again!" });
    }
    res.send({ tours });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// < ------------------------------ API for get tour by id ------------------------------ >
router2.get("/gettourbyid", fetchuser, async (req, res) => {
  try {
    const { tourId } = req.body;
    let tours = await BookTour.find({ user: req.user.userId, tourId });
    if (!tours) {
      return res
        .status(400)
        .json({ error: "No tours found, please book a tour and try again!" });
    }
    res.send({ tours });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router2;
