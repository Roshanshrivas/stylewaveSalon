import React, { useState } from "react";

const Orders = () => {
  // Sample data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      service: "Haircut",
      date: "2025-08-16",
      time: "10:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      service: "Facial",
      date: "2025-08-17",
      time: "02:00 PM",
      status: "Pending",
    },
  ]);

  // Handle Approve
  const handleApprove = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Approved" } : order
      )
    );
  };

  // Handle Reject
  const handleReject = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Rejected" } : order
      )
    );
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
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.service}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.time}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleApprove(order.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
