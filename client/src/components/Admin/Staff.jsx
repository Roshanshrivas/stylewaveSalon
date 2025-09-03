import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Staff = () => {
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/staff/getall`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        setStaffs(res.data.data);
        toast.success("Staff Fetched");
      }
    } catch (error) {
      toast.error("Staff Failed!", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  // ✅ Edit Slots
  const handleEditStaff = (id) => {
    navigate(`/admin/dashboard/staff/${id}`);
  };

  // ✅ Delete Slots
  const handleDeleteStaff = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/staff/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success("🗑️ Staff deleted");
        fetchStaff();
      }
    } catch (error) {
      toast.error("❌ Failed to delete Staff");
    }
  };

  return (
    <div className="w-full h-full">
      {/* text */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Staff</h1>
        <p className="text-gray-700 mb-6">Manage your Unisex salon Staff.</p>
      </div>
      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Staff</h2>
          <Link to="/admin/dashboard/staff/create">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Add New Staff
            </button>
          </Link>
        </div>
      </div>
      <table className="border w-full mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Specialization</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs?.length > 0 ? (
            staffs?.map((staff, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 border">{staff?.name}</td>
                <td className="p-2 border">{staff?.role}</td>
                <td className="p-2 border">{staff?.status}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEditStaff(staff._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteStaff(staff._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No Staff
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
