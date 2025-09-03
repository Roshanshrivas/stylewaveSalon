import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/slots/getAllSlots`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log("res:", res.data.data);

      if (res?.data?.success) {
        setSlots(res.data.data);
        toast.success("Slots Successfully");
      }
    } catch (error) {
      toast.error("❌ Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);


  // ✅ Edit Slots
  const handleEditSlot = (id) => {
     navigate(`/admin/dashboard/slots/${id}`)
  }

  // ✅ Delete Slots
 const handleDeleteSlot = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/slots/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
      });

      if(res?.data?.success) {
        toast.success("🗑️ Slot deleted");
        fetchSlots();
      }
    } catch (error) {
      toast.error("❌ Failed to delete slot");
    }
 }


  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-3xl font-bold mb-4">Slots</h1>
        <p className="text-gray-700 mb-6">
          Manage your salon services Time Slots.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Slots</h2>
          <Link to="/admin/dashboard/slots/create">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            onClick={""}
            >
              Add New Slots
            </button>
          </Link>
        </div>
        {/* <div> */}
        <table className="border w-full mt-4">
          <thead className="">
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots?.length > 0 ? (
              slots?.map((slot, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{new Date(slot?.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month:"short",
                    year:"numeric",
                  })}
                  </td>
                  <td className="p-2 border">
                    {new Date(`1970-01-01T${slot?.time}:00`).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="p-2 border">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEditSlot(slot._id)}
                    >
                        Edit
                    </button>
                    <button 
                     onClick={() => handleDeleteSlot(slot._id)}
                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No Services Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Slots;
