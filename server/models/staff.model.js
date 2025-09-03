import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true, 
    },
    role: { 
      type: String,
      trim: true, 
      required:true,
    }, // Barber, Makeup Artist, etc
    status: { 
      type: String, 
      enum: ["Active", "InActive"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);
