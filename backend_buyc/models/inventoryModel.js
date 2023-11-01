const mongoose = require("mongoose");
const { OemSpecsModel } = require("./oemSpecsModel");
const { UserModel } = require("./userModel");

const inventorySchema = mongoose.Schema({
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: OemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
  pictures: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: Array, required: true },
  kms: { type: Number, required: true },
  majorScratches: { required: true, type: String },
  orginalPaint: { required: true, type: String },
  accidents: { required: true, type: Number },
  prevBuyers: { required: true, type: Number },
  registrationPlace: { required: true, type: String },
  price: { required: true, type: Number },
});

const InventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = { InventoryModel };
