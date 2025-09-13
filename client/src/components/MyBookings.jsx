import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Loader2, Calendar, User, Clock, IndianRupee, CreditCard } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/mybooking`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      setBookings(res?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/booking/cancel/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      toast.success("Booking cancelled");
      setBookings((prev) => prev.map((b) => (b._id === id ? data.data : b)));
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-600">Loading bookings...</p>
      </div>
    );

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No bookings found ✨</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        My Bookings
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="p-5 rounded-2xl shadow-md border bg-white hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {booking?.serviceId?.name || "Service"}
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <User size={16} /> Staff:{" "}
                <span className="font-medium">
                  {booking?.staffId?.name || "N/A"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> Time: {booking?.timeSlotId?.time}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} /> Date:{" "}
                {booking?.timeSlotId?.date?.slice(0, 10)}
              </p>
              <p className="flex items-center gap-2">
                <CreditCard size={16} /> Payment:{" "}
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    booking.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.paymentMethod} ({booking.paymentStatus})
                </span>
              </p>
              <p className="flex items-center gap-2">
                <IndianRupee size={16} /> Price:{" "}
                <span className="font-semibold">₹{booking.price}</span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    booking.status === "booked"
                      ? "bg-blue-100 text-blue-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>

            {booking.status === "booked" && (
              <button
                onClick={() => cancelBooking(booking._id)}
                className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
