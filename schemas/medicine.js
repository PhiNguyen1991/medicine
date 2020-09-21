const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: String,
  price: Number,
});

// Collection inside the database
module.exports = mongoose.model("medicine", medicineSchema);
