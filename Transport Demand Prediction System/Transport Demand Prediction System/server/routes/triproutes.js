import express from "express";
import { createTrip, getTrips } from "../controllers/tripController.js";

const router = express.Router();

router.post("/create", createTrip);
router.get("/all", getTrips);

export default router;