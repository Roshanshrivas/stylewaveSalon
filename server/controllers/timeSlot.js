import { TimeSlot } from "../models/TimeSlot.model.js";

//=================================================
//=================== TimeSlot ====================
//=================================================

//Slots created
export const slotCreate = async (req, res) => {
  try {
    //fetch data from request body
    const { date, time } = req.body;
    console.log("date, times", date, time);
    

    //validation
    if (!date || !time) {
      return res.status(400).json({
        message: "Date And Time Required!",
      });
    }

    //Check if Time & Date Exist or not
    // const exists = await TimeSlot.findOne({ date, time });
    //   // if (!exists) {
    //   //   return res.status(400).json({
    //   //     success:false,
    //   //     message:"Slot Already Exist!"
    //   //   })
    //   // }
  
    const createdSlot = await TimeSlot.create({ date, time });

    return res.status(201).json({
      success: true,
      message: "Slot Create Successfully",
      data: createdSlot,
    });
  } catch (error) {
    console.error("Slot Create Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server Err!!",
    });
  }
};

//slots update with Bulk slots Delete All Old Slots
export const slotsAllUpdate = async (req, res) => {
  try {
    //fetch data
    const { date, times } = req.body;
    console.log("date, times", date, times);

    //valid
    if (!date || !Array.isArray(times)) {
      return res.status(400).json({
        success: false,
        message: "All the fileds Required",
      });
    }
    //Delete all existing slots for that date
    await TimeSlot.deleteMany({ date });

    // Create new slots
    const newSlots = [];
    for (let time of times) {
      const slot = await TimeSlot.create({ date, time });
      newSlots.push(slot);
    }

    return res.status(201).json({
      success: true,
      message: "Slots Updated Successfully",
      data: newSlots,
    });
  } catch (error) {
    console.error("Slot Updating Failed!!", error.message);
    return res.status(500).json({
      success: true,
      message: "internal server error!!",
    });
  }
};

// Update Slot (Single) - updateSlotById
export const updateSlotById = async (req, res) => {
  try {
    //fetch data by id
    const { id } = req.params;

    //fetch data from request body
    const { date, time } = req.body;

    //find slots by id
    const updateSlots = await TimeSlot.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );

    //validation
    if (!updateSlots) {
      return res.status(400).json({
        success: false,
        message: "Slot Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Slot Update Successfully.",
      data: updateSlots,
    });
  } catch (error) {
    console.error("Update Slot Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Err!!",
    });
  }
};

//Delete Slot by ID (Single)
export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSlot = await TimeSlot.findByIdAndDelete(id);
    if (!deleteSlot) {
      return res.status(400).json({
        message: "Slot Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Slot Deleted Successfully",
    });
  } catch (error) {
    console.error("Slot Delete Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Err!!",
    });
  }
};

//Get All Slots
export const getAllSlots = async (req, res) => {
  try {
    const slots = await TimeSlot.find().sort({ date: 1, time: 1 });
    return res.status(200).json({
      success: true,
      message: "All Slots Fetched Successfully",
      data: slots,
    });
  } catch (error) {
    console.error("Fetching All Slots Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Err!!",
    });
  }
};

// Get single slots by ID
export const getSingleSlots = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await TimeSlot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot Not Found!!",
      });
    }

    res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Slot",
      error: error.message,
    });
  }
};
