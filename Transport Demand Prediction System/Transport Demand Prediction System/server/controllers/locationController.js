import User from "../models/User.js";

export const updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    location: {
      type: "Point",
      coordinates: [lng, lat]
    }
  });

  res.json("Location updated");
};

export const getDrivers = async (req, res) => {
  const { lat, lng } = req.query;

  const drivers = await User.find({
    role: "driver",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 5000
      }
    }
  });

  res.json(drivers);
};