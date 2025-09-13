import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setBookings } from "../../redux/slices/bookingSlice";

const Appointments = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [orders, setOrders] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const dispatch = useDispatch();


  //Fetch All Bookings
  const fetchAllBookings = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/booking/getall`,
           { 
             headers: { Authorization: `Bearer ${accessToken}` },
             withCredentials: true
           }
        );

        console.log("res", res?.data?.data);

        if(res?.data?.success){
          toast.dismiss();
          toast.success(res?.data?.message, { id: "fetchBookings" });
          setOrders(res?.data?.data);
          dispatch(setBookings(res?.data?.data));
         }
    } catch (error) {
        console.error("Error Fetching Bookings:", error.message);
        toast.error("Failed to fetch appointments");
    }
  }

  useEffect(() => {
      fetchAllBookings();
  }, []);

   // ✅ Update Booking Status (Approve / Reject)
  const updateStatus = async (id, status) => {
    try {
       setLoadingIds((prev) => [...prev, id]);
      // Optimistic UI update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/booking/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.dismiss();
        toast.success(res?.data?.message, { id: `status-${id}` });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update booking status");

      // ❌ Revert UI if API fails
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "booked" } : order
        )
      );
    } finally {
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders / Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isLoading = loadingIds.includes(order._id);
              return (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order?.userId?.firstName && order?.userId?.lastName ? `${order.userId.firstName} ${order.userId.lastName}` : "N/A"}</td>
                <td className="p-3">{order?.serviceId?.serviceName}</td>
                <td className="p-3">
                    {new Date(order?.timeSlotId?.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month:"short",
                    year:"numeric",
                  })}
                </td>
                <td className="p-3">
                    {new Date(`1970-01-01T${order?.timeSlotId?.time}:00`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "booked"
                        ? "bg-yellow-500"
                        : order.status === "Approved"
                        ? "bg-green-500"
                        : order.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {order?.status}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => updateStatus(order._id, "Approved")}
                      className={`px-3 py-1 rounded text-white ${
                        isLoading
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "..." : "Approve"}
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "Rejected")}
                      className={`px-3 py-1 rounded text-white ${
                        isLoading
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "..." : "Reject"}
                    </button>
                  </td>
              </tr>
            )
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
