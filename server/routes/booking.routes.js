import express from "express";
import { createBooking, getMyBookings, cancelBooking, verifyPayment, getAllBookings, updateBookingStatus, getAdminDashboard } from "../controllers/booking.js";
import { auth, isUser } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/create", auth, createBooking); // book appointment
router.post("/verify", auth, verifyPayment);
router.get("/getall", auth, getAllBookings);
router.put("/status/:bookingId", auth, updateBookingStatus);
router.get("/stats", auth, getAdminDashboard)


router.get("/mybooking", auth, getMyBookings); // user bookings
router.put("/cancel/:id", auth, isUser, cancelBooking); // cancel booking


export default router;