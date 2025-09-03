import express from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/booking.js";
import { auth, isUser } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/", auth, isUser, createBooking); // book appointment
router.get("/my", auth, isUser, getMyBookings); // user bookings
router.put("/cancel/:id", auth, isUser, cancelBooking); // cancel booking


export default router;