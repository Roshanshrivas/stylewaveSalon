import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  status: {
    type: String,
    enum: ["draft", "publish"],
    default: "draft",
  },
  subServices: [ { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "SubService" 
  } ],
}, { timestamps: true } );

export const Service = mongoose.model("Service", serviceSchema);
