import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Service" ,
  },
  bookings: [
    {
      staff: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Staff" 
      },
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
    }
  ]
}, { timestamps: true });

export const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
