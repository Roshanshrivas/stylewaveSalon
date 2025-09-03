import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { clearPendingBooking, setPendingBooking } from "../redux/slices/bookingSlice";


const BookingForm = () => {
  // Sample data (replace with DB later if needed)
  // const servicesData = {
  //   Male: {
  //     "Hair Cut": [
  //       { name: "Normal Haircut", price: 200 },
  //       { name: "Stylish Haircut", price: 400 },
  //     ],
  //     Facial: [
  //       { name: "Gold Facial", price: 800 },
  //       { name: "Fruit Facial", price: 600 },
  //     ],
  //     Massage: [
  //       { name: "Head Massage", price: 300 },
  //       { name: "Body Massage", price: 1000 },
  //     ],
  //   },
  //   Female: {
  //     "Hair Cut": [
  //       { name: "Layer Cut", price: 500 },
  //       { name: "Bob Cut", price: 700 },
  //     ],
  //     Facial: [
  //       { name: "Diamond Facial", price: 1200 },
  //       { name: "Pearl Facial", price: 1000 },
  //     ],
  //     Makeup: [
  //       { name: "Party Makeup", price: 1500 },
  //       { name: "Bridal Makeup", price: 5000 },
  //     ],
  //   },
  // };

  const [gender, setGender] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [date, setDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [slots, setSlots] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const { services } = useSelector((state) => state.services); // ✅ correct way
  const pendingBooking  = useSelector((state) => state.booking.pendingBooking); // ✅ correct way

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // ✅ Fetch All Services
  useEffect(() => {
  const fetchServices = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services/getallservices`,
        {
          withCredentials: true,
        }
      );
      setServicesList(res?.data?.data || []);
    
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  }
    fetchServices();
  }, [accessToken]);
  

  // ✅ Fetch staff list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/staff/getall`,
        { withCredentials: true },
      );
        setStaffList(res?.data?.data);
      } catch (error) {
        console.error("Failed to fetch staff", error);
      }
    };
    fetchStaff();
  }, [accessToken]);


  // ✅ Fetch available slots when date changes
  useEffect(() => {
    if (!date) return;
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/slots/getAllSlots/?date=${date}`,
        {
          withCredentials: true,
        }
      );
        setSlots(res?.data?.data);
      } catch (error) {
        console.error("Failed to fetch slots", error);
      }
    };
    fetchSlots();
  }, [date, accessToken]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const bookingData = {
        userId: user?._id,
        serviceId: selectedService,
        subServiceId: selectedSubService,
        timeSlotId: slotId,
        staffId,
        paymentMethod: "cod",
      };

    // 🔹 If user is not logged in → save data in Redux & redirect.
    if(!user){
        dispatch(setPendingBooking(bookingData));
        navigate("/login");
        return;
    };

  try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/`, 
        bookingData,
          {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      alert("Booking Confirmed ✅\n" + JSON.stringify(res.data, null, 2));
      dispatch(clearPendingBooking());
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  };

   // ✅ If user just logged in → check Redux for pending booking
  useEffect(() => {
    if (pendingBooking && user) {
      (async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/booking/`,
            { ...pendingBooking, userId: user._id },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          );
          alert("Booking Confirmed ✅\n" + JSON.stringify(res.data, null, 2));
          dispatch(clearPendingBooking());
        } catch (error) {
          console.error("Auto booking failed", error);
        }
      })();
    }
  }, [user, pendingBooking, accessToken, dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-2xl mt-16 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Book Your Appointment
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter your contact number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setSelectedService("");
              setSelectedSubService("");
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Service */}
        {gender && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Select Service <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setSelectedSubService("");
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Select Service --</option>
              {servicesList.filter((srv) => srv.gender === gender)
              .map((srv) => (
                <option key={srv._id} value={srv._id}>
                  {srv?.serviceName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sub Service */}
        {selectedService && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Select Sub Service <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={selectedSubService}
              onChange={(e) => setSelectedSubService(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Select Sub Service --</option>
              {servicesList.find((srv) => srv._id === selectedService)?.subServices.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name} (₹{sub.price})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Choose Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Available Slots */}
        {slots?.length > 0 && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Available Slots <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={slotId}
              onChange={(e) => setSlotId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Select Slot --</option>
              {slots?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.time}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Staff */}
        {staffList?.length > 0 && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Select Staff <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Select Staff --</option>
              {staffList
                ?.filter((staff) => staff?.status === "Active")
                .map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {`${staff?.name} ${staff?.role}`}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 bg-pink-500 text-white font-semibold text-lg rounded-lg shadow hover:bg-pink-600 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
