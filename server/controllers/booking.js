import { Booking } from "../models/Booking.mode.js";
import { TimeSlot } from "../models/TimeSlot.model.js";
import { Staff } from "../models/staff.model.js";
import { Service } from "../models/service.model.js";

//=================================================
//=================== Booking =====================
//=================================================


// ✅ Create Booking
export const createBooking = async(req, res) => {
    try {
        const {serviceId, timeSlotId, staffId, paymentMethod} = req.body;
        const userId = req.user._id; // from auth middleware

        //validation
        if(!userId || !serviceId || !timeSlotId || !staffId || !paymentMethod){
            return res.status(400).json({
                message:"ALl Failed Required!"
            })
        }

        //Check staff is free for that slot
        const existingBooking = await Booking.findOne({ timeSlotId, staffId, status: "booked"});

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "This staff is already booked for this slot. Please choose another staff.",
            });
        };

        //Create Booking
        const booking = await Booking.create({
            userId,
            serviceId,
            timeSlotId,
            staffId,
            paymentMethod,
        });

    return res.status(201).json({
        success:true,
        message:"Booking Successful!!",
        data: booking,
    });

    } catch (error) {
        console.error("Booking Failed!!", error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Err!!"
        })
    }
}

// ✅ Get logged in user's bookings
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
        .populate("serviceId")
        .populate("timeSlotId")
        .populate("staffId");

        return res.status(200).json({
            success:true,
            data: bookings
        });

    } catch (error) {
       return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
     }); 
    }
}


// ✅ Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking Not Found!!"
            });
        }

        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json({
            success: true, 
            message: "Booking cancelled", 
            data: booking,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Err!!"
        })
    }
}