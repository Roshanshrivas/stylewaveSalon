import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
 },
  price: { 
     type: Number, 
     required: true 
    },
  duration: { 
     type: String, 
     required: true 
    }, // example: "30 min", "1 hour"
});

export const SubService = mongoose.model("SubService", subServiceSchema);
