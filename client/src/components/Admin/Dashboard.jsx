import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/stats`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setStats(res.data.stats);
        setRevenue(res.data.revenue);
        setRecentBookings(res.data.recentBookings);
        setTopServices(res.data.topServices);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard stats!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">📊 Admin Dashboard</h1>
      <p className="text-gray-600">
        Manage your salon’s operations and track performance.
      </p>

      {/* ======= Stats Cards ======= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Users", value: stats?.totalUsers, color: "bg-blue-100 text-blue-700" },
          { title: "Total Bookings", value: stats?.totalBookings, color: "bg-green-100 text-green-700" },
          { title: "Total Revenue", value: `₹${stats?.totalRevenue}`, color: "bg-purple-100 text-purple-700" },
          { title: "Pending Bookings", value: stats?.pendingBookings, color: "bg-yellow-100 text-yellow-700" },
          { title: "Completed Orders", value: stats?.completedBookings, color: "bg-teal-100 text-teal-700" },
          { title: "This Week’s Sales", value: `₹${stats?.weeklySales}`, color: "bg-pink-100 text-pink-700" },
        ].map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-md p-6 transition transform hover:scale-105 ${item.color}`}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ======= Revenue Chart ======= */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(val) => `₹${val}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ======= Recent Orders + Top Services ======= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🛒 Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Payment</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{order?.customer}</td>
                    <td className="p-2">₹{order?.amount}</td>
                    <td className={`p-2 font-semibold ${order?.status === "Approved" ? "text-green-600" : "text-yellow-600"}`}>
                      {order?.status}
                    </td>
                    <td className="p-2">{order?.paymentStatus}</td>
                    <td className="p-2">{order?.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔥 Top-Selling Services</h2>
          <ul>
            {topServices.map((service) => (
              <li
                key={service._id}
                className="flex justify-between items-center p-3 border-b hover:bg-gray-50"
              >
                <span className="font-medium">{service.service}</span>
                <span className="text-gray-600">{service.sales} sales</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
