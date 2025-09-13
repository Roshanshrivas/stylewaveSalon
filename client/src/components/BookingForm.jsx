import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearPendingBooking, setPendingBooking } from "../redux/slices/bookingSlice";
import { toast } from "react-hot-toast";

const BookingForm = () => {
  // ... state hooks (same as your file)
  const [gender, setGender] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [date, setDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [slots, setSlots] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const pendingBooking = useSelector((state) => state.booking.pendingBooking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/services/getallservices`, { withCredentials: true });
        setServicesList(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, [accessToken]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/staff/getall`, { withCredentials: true });
        setStaffList(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch staff", err);
      }
    };
    fetchStaff();
  }, [accessToken]);
  useEffect(() => {
    if (!date) return;
    
    const fetchSlots = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/slots/getSlots/?date=${date}`, 
          { withCredentials: true });
        setSlots(res?.data?.data || []);
        console.log("slots", slots);
        
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchSlots();
  }, [date, accessToken]);

  const servicePrice = servicesList
    ?.find((s) => s._id === selectedService)
    ?.subServices?.find((sub) => sub._id === selectedSubService)?.price || 0;

  // createBooking returns { order, bookingId } when paymentMethod === 'online'
  const handleRazorpayPayment = async (bookingData) => {
    try {
      // Call backend to create booking + razorpay order (backend will create Booking with pending status and return order + bookingId)
      const createRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (!createRes.data.success) {
        throw new Error(createRes.data.message || "Create booking failed");
      }

      const { order, bookingId } = createRes.data;
      // order contains: id, amount, currency etc.

      // open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "StyleWave Salon",
        description: "Booking payment",
        order_id: order.id,
        handler: async function (response) {
          // response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
          try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/booking/verify`,
              {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
              }
            );

            alert("✅ Payment successful and booking confirmed!");
            dispatch(clearPendingBooking());
            navigate("/my-bookings");
          } catch (err) {
            console.error("Error verifying payment:", err);
            alert("Payment succeeded but booking verification failed. Contact support.");
          }
        },
        prefill: {
          name: user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "",
          email: user?.email || "",
        },
        theme: { color: "#EC4899" },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Add https://checkout.razorpay.com/v1/checkout.js to index.html");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay init failed", error);
      // alert(error?.response?.data?.message || error.message || "Payment init failed");
      toast.error(error?.response?.data?.message || error.message || "Payment init failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build booking data
    const bookingData = {
      serviceId: selectedService,
      subServiceId: selectedSubService,
      timeSlotId: slotId,
      staffId,
      paymentMethod,
      price: servicePrice,
    };

    // save to pending in redux and redirect to login if user not logged in
    if (!user) {
      dispatch(setPendingBooking(bookingData));
      navigate("/login");
      return;
    }

    // If COD → call booking/create (will create booking directly)
    if (paymentMethod === "cod") {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/create`, bookingData, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        alert("✅ Booking confirmed (COD)");
        dispatch(clearPendingBooking());
        navigate("/my-bookings");
      } catch (err) {
        console.error("COD booking failed", err);
        alert("COD booking failed. Try again.");
      }
      return;
    }

    // Online payment via Razorpay
    await handleRazorpayPayment(bookingData);
  };

  // If user logs in and there was a pending booking: send it
  useEffect(() => {
    if (!pendingBooking || !user) return;

    // attach user id server-side via JWT, but ensure pendingBooking has price
    if (pendingBooking.paymentMethod === "cod") {
      (async () => {
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/booking/create`, { ...pendingBooking }, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          });
          alert("Booking created after login (COD)");
          dispatch(clearPendingBooking());
          navigate("/my-bookings");
        } catch (err) {
          console.error("Auto-COD booking failed", err);
        }
      })();
    } else {
      // online
      handleRazorpayPayment(pendingBooking);
    }
  }, [user, pendingBooking, accessToken, dispatch, navigate]);


  return (
    <div id="booking-section" className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-2xl mt-16 border border-gray-200">
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

         {/* Payment Method */}
        <div className="md:col-span-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Payment Method <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online (Razorpay)
            </label>
          </div>
        </div>

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
