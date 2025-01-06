const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookTourSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  adults: {
    type: String,
    required: true,
  },
  childs: {
    type: String,
    required: true,
  },
  tourId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stayTime: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("BookTour", bookTourSchema);
