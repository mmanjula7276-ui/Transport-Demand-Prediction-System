import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  customerId: String,
  driverId: String,
  pickup: String,
  drop: String,
  price: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Trip", tripSchema);