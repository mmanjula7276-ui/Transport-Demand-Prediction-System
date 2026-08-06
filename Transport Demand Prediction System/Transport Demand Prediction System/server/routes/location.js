import express from "express";
import { updateLocation, getDrivers } from "../controllers/locationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/update", protect, updateLocation);
router.get("/drivers", protect, getDrivers);

export default router;