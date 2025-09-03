import React, { useState } from "react";

const Payments = () => {
  const [payments] = useState([
    {
      id: 1,
      customer: "Aarav Sharma",
      service: "Haircut",
      amount: 200,
      method: "UPI",
      date: "2025-08-10",
      status: "Paid",
    },
    {
      id: 2,
      customer: "Priya Verma",
      service: "Facial Treatment",
      amount: 500,
      method: "Card",
      date: "2025-08-11",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Rahul Mehta",
      service: "Pedicure",
      amount: 350,
      method: "Cash",
      date: "2025-08-12",
      status: "Paid",
    },
  ]);

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
              <tr key={payment.id} className="border-b">
                <td className="p-2 border">{payment.customer}</td>
                <td className="p-2 border">{payment.service}</td>
                <td className="p-2 border">{payment.amount}</td>
                <td className="p-2 border">{payment.method}</td>
                <td className="p-2 border">{payment.date}</td>
                <td
                  className={`p-2 border font-semibold ${
                    payment.status === "Paid" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {payment.status}
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
