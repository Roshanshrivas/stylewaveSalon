import crypto from "crypto";
import { Booking } from "../models/Booking.mode.js";
import { TimeSlot } from "../models/TimeSlot.model.js";
import { Staff } from "../models/staff.model.js";
import { Service } from "../models/service.model.js";
import { razorpayInstance } from "../utils/razorpay.js";
import { User } from "../models/user.model.js";


//=================================================
//=================== Booking =====================
//=================================================


// 🔹 Create Order (COD or Online)
export const createBooking = async (req, res) => {
    try {
        const {serviceId, subServiceId, timeSlotId, staffId, paymentMethod, price } = req.body;
        // tolerant userId resolution (depends on token payload shape)
        const userId = req.user._id || req.user?.userId || req.user?.id;
        
        console.log("userId", userId);
        console.log("payload", { serviceId, subServiceId, timeSlotId, staffId, paymentMethod, price });

        
        // Validate required fields
         if (!userId || !serviceId || !subServiceId || !timeSlotId || !staffId || !price) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Check if slot is already booked by ANY user
        const existingBooking = await Booking.findOne({
            serviceId,
            subServiceId,
            timeSlotId,
            staffId,
            status: { $in: ["booked", "pending"] }, // active bookings
        });

        if(existingBooking) {
            return res.status(400).json({
            success: false,
            message: "This time slot is already booked!",
         });
        }

        // ✅ Prevent same user from booking same slot again
            const userConflict = await Booking.findOne({
            userId,
            serviceId,
            subServiceId,
            timeSlotId,
            staffId,
            status: { $in: ["booked", "pending"] },
            });

            if (userConflict) {
            return res.status(400).json({
                success: false,
                message: "You already booked this service in the same slot.",
            });
            }
        //COD Booking
        if(paymentMethod === "cod") {
          const booking = await Booking.create({
            userId,
            serviceId,
            subServiceId,
            timeSlotId,
            staffId,
            paymentMethod: "cod",
            paymentStatus: "pending",
            status: "booked",
            price,
        });
        return res.status(201).json({ 
            success: true, 
            message: "Booking confirmed (COD)", 
            booking, 
        });
     }

    // ✅ Online Booking → Create Razorpay Order
    const options = {
        amount: price * 100, // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

     if (!razorpayInstance?.orders) {
        return res.status(500).json({ success: false, message: "Razorpay is not configured on server" });
     }

    const order = await razorpayInstance.orders.create(options);

    // Save booking in DB with "pending" payment
     const booking = await Booking.create({
            userId,
            serviceId,
            subServiceId,
            timeSlotId,
            staffId,
            paymentMethod: "online",
            paymentStatus: "pending",
            status: "booked",
            price,
            razorpayOrderId: order.id,
        });

        console.log("booking", booking);
        
        
    return res.status(201).json({
        success:true,
        message: "Razorpay order created",
        order,
        bookingId: booking._id,
    });

    } catch (error) {
        console.error("CreateBooking Failed!!", error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Err!!"
        })
    }
}

// 🔹 Verify Payment (Razorpay callback)
export const verifyPayment = async (req, res) => {
    try {
       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

     if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // ✅ Update booking status in DB
    const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: "paid",
        },
        { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({
        success:true,
        message: "Payment verified successfully", 
        booking,
    })
} catch {
    console.error("Payment verification failed:", error);
    return res.status(500).json({ 
        success: false, 
        message: "Server error", error: error.message });
  }
}


// ✅ Get logged in user's bookings
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user?.id || req.user?._id || req.user?.userId })
        .populate("serviceId")
        .populate("timeSlotId")
        .populate("staffId");

        console.log("bookings", bookings);

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

// ✅ Admin: Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate("userId")
        .populate("serviceId")
        .populate("subServiceId")
        .populate("timeSlotId")
        .populate("staffId");
        console.log("All Bookings", bookings);
        
        return res.status(200).json({
            success:true,
            message:"All Bookings Fetched",
            data: bookings,
        })
    } catch (error) {
        console.error("Get Bookings Failed!", error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Err!!"
        })
    }
}


// ✅ Admin: Update Booking Status
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // Approved Or Rejected

        if(!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                success:false,
                message: "Invalid Status Value",
            });
        }

        const booking = await Booking.findByIdAndUpdate(
           bookingId,
           { status },
           { new: true }
        ).populate("userId", "firstName lastName email")
        .populate("serviceId")
        .populate("subServiceId")
        .populate("timeSlotId")
        .populate("staffId");

        console.log("updateBookingStatus", booking);
        

        if(!booking) {
            return res.status(404).json({
                success:false,
                message: "Booking Not Found!",
            });
        }

        return res.status(200).json({
            success:true,
            message: `Booking ${status} updated`,
            data: booking,
        });

    } catch (error) {
       console.error("Update Booking Error:", error.message);
       return res.status(500).json({
       success: false,
       message: "Internal server error",
    }); 
    }
}

// ✅ Admin: AdminDashboard stats

export const getAdminDashboard = async (req, res) => {
    try {
        //total Users
        const totalUsers = await User.countDocuments({ role: "user"});
        console.log("totalUsers", totalUsers);
        
        //Total Orders
        const totalBookings = await Booking.countDocuments();
        console.log("totalBookings", totalBookings);
        
        //Total Revenue (Sum of paid Bookings only)
        const revenueAgg = await Booking.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, total: { $sum: "$price" } } },
        ]);
        const totalRevenue = revenueAgg[0]?.total || 0;
        console.log("totalRevenue", totalRevenue);
        

        //pending & Delivered / compelete Booking
        const pendingBookings = await Booking.countDocuments({ status: "booked" });
        const completedBookings = await Booking.countDocuments({ status: "completed" });
        console.log("pendingBookings&complt", pendingBookings);
        console.log("completedBookings", completedBookings);
        
        

        //This weeks sales (Only Paid)
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - 7);
        const weeklySalesAgg = await Booking.aggregate([
          { 
            $match: { 
            paymentStatus: "paid", 
            createdAt: { $gte: startOfWeek },
           },
         },
          { $group: { _id: null, total: { $sum: "$price" } } },
        ]);
        const weeklySales = weeklySalesAgg[0]?.total || 0;

        // Monthly revenue chart
        const revenue = await Booking.aggregate([
            {$match: { paymentStatus: "paid" } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    total: { $sum: "$price" },
                },
            },
            { $sort: { "_id.year" : 1, "_id.month": 1}},
        ]);
         const monthlyRevenue = revenue.map((r) => ({
      month: new Date(r._id.year, r._id.month - 1).toLocaleString("default", {
        month: "short",
      }),
      revenue: r.total,
    }));

    //Recent Bookings
    const recentBookings = await Booking.find()
    .sort({ createdAt: -1})
    .limit(5)
    .populate("userId", "firstName lastName")
    .select("status createdAt price paymentStatus");

    const recentOrdersFormatted = recentBookings.map((o) => ({
        _id: o._id,
        customer: o.userId ? `${o.userId.firstName} ${o.userId.lastName}` : "Guest",
        amount: o.price,
        status: o.status,
        paymentStatus: o.paymentStatus,
        date: o.createdAt.toISOString().split("T")[0],
    }));

    // Top Selling Services
    const topServices = await Booking.aggregate([
        { $group: { _id: "$serviceId", count: { $sum: 1}}},
        { $sort: { count: -1 }},
        { $limit: 5 },
        {
            $lookup: {
                from: "services",
                localField: "_id",
                foreignField: "_id",
                as: "serviceDetails",
            },
        },
        { $unwind: "$serviceDetails" },
        {
            $project: {
                service: "$serviceDetails.serviceName",
                sales: "$count",
            },
        },
    ]);

    res.json({
        success:true,
        stats: {
            totalUsers,
            totalBookings,
            totalRevenue,
            pendingBookings,
            completedBookings,
            weeklySales,
        }, 
        revenue: monthlyRevenue,
        recentBookings: recentOrdersFormatted,
        topServices,
    });
    } catch (error) {
        console.error("Admin Dashboard Error:", error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server Err!!"
        })
    }
}








