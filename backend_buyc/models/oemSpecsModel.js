const mongoose = require("mongoose");

const oemSpecsSchema = mongoose.Schema({
  modelName: { required: true, type: String },
  modelYear: { required: true, type: String },
  availableColors: { required: true, type: Array },
  mileage: { required: true, type: Number },
  power: { required: true, type: Number },
  maxSpeed: { required: true, type: Number },
  newPrice: { required: true, type: Number },
  pictures: { required: true, type: String },
});

const OemSpecsModel = mongoose.model("oemSpec", oemSpecsSchema);

module.exports = { OemSpecsModel };
