import Trip from "../models/Trip.js";

// CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ msg: "Error creating trip" });
  }
};

// GET HISTORY
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching trips" });
  }
};