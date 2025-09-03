import { Staff } from "../models/staff.model.js";

export const createStaff = async (req, res) => {
  try {
    const { name, role, status } = req.body;
    
    //validation
    if (!name || !status || !role) {
      return res.status(400).json({
        message: "All Fields are required!",
      });
    }

    //check if already staff member is existy
    const existStaff = await Staff.findOne({name, role, status})
    if(existStaff){
      return res.status(400).json({
        success:false,
        message:"Staff member already exists!"
      });
    };
    

    //create staff
    const staff = await Staff.create({
      name,
      status,
      role,
    })

   return res.status(201).json({
        success:true,
        message:"Staff Created SuccessFully",
        data: staff
    });
  } catch (error) {
    console.error("Create Staff Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error in Creating Staff",
    });
  }
};

// Get all staff
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ 
      success: true,
      message:"All Staff", 
      data: staff,
    });
  } catch (error) {
    console.error("Get Staff Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Single Staff by ID
export const getSingleStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const staff = await Staff.findById(staffId);
    if(!staff){
      return res.status(404).json({
        success:false,
        message:"Staff Not Found!!",
      });
    }
    res.status(200).json({
      success:true,
      data: staff,
    });
  } catch (error) {
    // console.error("Failed staff!!")
    return res.status(500).json({
      success:false,
      message:"Server Error!!",
      error: error.message,
    });
  }
}

// Get Update Staff By ID
export const updateStaff = async(req, res) => {
  try {
    //fetch data by id
    const {id} = req.params;
    //fetch data from request body
    const {name, role, status} = req.body;

    //find staff by id
    const updateStaff = await Staff.findByIdAndUpdate(
      id,
      {name, role, status},
      {new: true}
    );
    //Validation
    if(!updateStaff){
      return res.status(400).json({
        success: false,
        message: "Staff Not Found!",
      });
    }

    return res.status(200).json({
      success:true,
      message:"Staff Update Successfully",
      data:updateStaff,
    })
  } catch (error) {
    console.error("Update Staff Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Err!!",
    });
  }
}

//Delete staff by ID
export const deleteStaff = async(req, res) => {
  try {
    const {id} = req.params;
    const deleteStaff = await Staff.findByIdAndDelete(id);
    if(!deleteStaff){
      return res.status(400).json({
        message: "Staff Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Staff Deleted Successfully",
    });
  } catch (error) {
    console.error("Staff Delete Failed!!", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Err!!",
    });
  }
}







