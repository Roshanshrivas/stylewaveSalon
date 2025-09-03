import { Service } from "../models/service.model.js";
import { SubService } from "../models/subServices.js";
import { User } from "../models/user.model.js";



//=================================================
//=================== Services ====================
//=================================================


//Service Create
export const serviceCreate = async (req, res) => {
    try {
        //fetch date & time from req.body
        const {serviceName, gender, status, subServices} = req.body;
        console.log("serviceName, gender, status, subServices", serviceName, gender, status, subServices);
        
        //validation
        if(!serviceName || !gender ){
          return res.status(401).json({
            message:"All Fields Required*!!"
          });
        };

        //check if user is Admin
        const userId = req.user.userId;
        console.log("userId", userId);
        
        const adminDetails = await User.findById(userId, {role:"admin"});
        console.log("adminDetails", adminDetails);
        
        //validation
        if(!adminDetails){
          return res.status(403).json({
            message:"Only admins can create services!"
          });
        }

    // ✅ Step 1: Create SubService documents
        let subServiceIds = [];
        if(subServices && subServices.length > 0) {
          const createSubServices = await SubService.insertMany(subServices);
          subServiceIds = createSubServices.map(s => s._id);
        }


    // ✅ Step 2: Create Service with subService references
        const newServices = await Service.create({
          serviceName, 
          gender,
          status, 
          subServices: subServiceIds,
        });

        return res.status(201).json({
          success:true,
          message:"Create Services Successfully.",
          data: newServices,
        })

    } catch (error) {
      console.error("Service Create Failed!", error.message);
      return res.status(500).json({
        success:false,
        message:"internal server Err!!"
      })
    }
}


//Service Update
export const serviceUpdate = async(req, res) => {
  try {
    //fetch data 
    const {serviceId} = req.params;
    const {serviceName, gender, status, subServices} = req.body;
     
    // Find the service
    const service = await Service.findById(serviceId);
    if(!service) {
      return res.status(404).json({
        success:false,
        message:"Service not found"
      });
    }
    // // Data validation
    //     if(!serviceId || !serviceName || !gender){
    //         return res.status(404).json({
    //             success:false,
    //             message:"Missing Properties",
    //         });
    //     }

     // Update subServices
     const updatedSubServiceIds = [];

     for(let sub of subServices) {
      if(sub._id) {
        // Update existing subService
        const updated = await SubService.findByIdAndUpdate(
          sub._id,
          {name: sub.name, price: sub.price, duration: sub.duration },
          {new: true}
        );
        updatedSubServiceIds.push(updated._id);
      } else {
        //create new subservices
        const newSub = await SubService.create({
          name: sub.name, 
          price: sub.price, 
          duration: sub.duration 
        });
        updatedSubServiceIds.push(newSub._id);
      }
     }
        
     // Update main Service
     service.serviceName = serviceName;
     service.gender = gender;
     service.status = status;
     service.subServices = updatedSubServiceIds;

     await service.save();
        
     res.status(200).json({
        success:true,
        message:"Service Updated successFully",
        data: await Service.findById(serviceId).populate("subServices"), // return populated
      })
  } catch (error) {
    console.error("Appointment Update Failed!!", error.message);
      return res.status(500).json({
        success:false,
        message:"internal server Err!!"
      })
  }
}


// Service Delete
export const serviceDelete = async(req, res) => {
  try {
    const {serviceId} = req.params;
    const service = Service.findByIdAndDelete(serviceId).exec();
    if(!service){
      return res.status(404).json({
        message:"ServiceId not Found!!"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Appointment Deleted Successfully"
    });
  } catch (error) {
    console.error("Appointment Delete Failed!!", error.message);
    return res.status(500).json({
      success:false,
      message:"Internal server Err!!"
    })
  }
}


// Get All Services for User
export const getAllservice = async (req, res) => {
  try {
    //fetch all services 
    const service = await Service.find().populate("subServices");
    //validation
    if(!service || service.length === 0) {
      return res.status(200).json({
        success:true,
        data:[],
        message:"No services available yet!!"
      });
    };
    return res.status(200).json({
      success: true,
      message: "Fetched all services successfully.",
      data: service,
    });
  } catch (error) {
    console.error("Get All Services Failed!!", error.message);
    return res.status(500).json({
      success:false,
      message:"internal server Err!!"
    })
  }
} 

// Get single service by ID
export const getSingleService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId).populate("subServices");

    if(!service){
      return res.status(404).json({
        success:false,
        message:"Service not Found!",
      });
    }

    res.status(200).json({
      success:true,
      data:service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching service",
      error: error.message,
    });
  }
}







