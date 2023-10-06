const mongoose = require("mongoose");
//Create schema
const carSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    release_date: { type: Number, required: true },
    transmission_type: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    style: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);
//Create and export model
const Car = mongoose.model("Car", carSchema);
module.exports = Car;