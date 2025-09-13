import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Payments = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [payments, setPayments] = useState([]);

  //Fetch All Bookings
  const fetchAllBookings = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/booking/getall`,
           { 
             headers: { Authorization: `Bearer ${accessToken}` },
             withCredentials: true
           }
        );

        console.log("Payment", res?.data?.data);

        if(res?.data?.success){
          toast.dismiss();
          toast.success(res?.data?.message, {id: "fetchBookings"});
          setPayments(res?.data?.data);
         }
    } catch (error) {
        console.error("Error Fetching Bookings:", error.message);
        toast.error("Failed to fetch Bookings!!");
    }
  }

  useEffect(() => {
      fetchAllBookings();
  }, [])
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payments</h1>
      <p className="text-gray-700 mb-6">View and manage all customer payments.</p>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Amount (₹)</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b">
                <td className="p-2 border">{payment?.userId?.firstName && payment?.userId?.lastName ? `${payment.userId.firstName} ${payment.userId.lastName}` : "N/A"}</td>
                <td className="p-2 border">{payment?.serviceId?.serviceName}</td>
                <td className="p-2 border">₹ {payment?.price}</td>
                <td className="p-2 border">{payment?.paymentMethod}</td>
                <td className="p-2 border">
                  {new Date(payment?.timeSlotId?.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month:"short",
                    year:"numeric",
                  })}
                </td>
                <td
                  className={`p-2 border font-semibold ${
                    payment?.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {payment?.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
