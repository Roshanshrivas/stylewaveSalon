import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteService } from "../../redux/slices/servicesSlice";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/services/getallservices`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        setServices(res.data.data);
        toast.success("Successfully");
      }
    } catch (error) {
      toast.error("❌ Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/services/service-delete/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}`},
          withCredentials: true,
        }
      );
      
      if (res?.data?.success) {
        toast.success("🗑️ Service deleted");
        fetchServices(); // Refresh list
        dispatch(deleteService(id));
      }
    } catch (error) {
      toast.error("❌ Failed to delete service");
    }
  };

  // ✅ Edit Service (Navigate to edit page with ID)
  const handleEditService = (id) => {
    navigate(`/admin/dashboard/services/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Services</h1>
      <p className="text-gray-700 mb-6">Manage your salon services here.</p>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Services</h2>
          <Link to="/admin/dashboard/services/create">
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              Add New Service
            </button>
          </Link>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Service Name</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.length > 0 ? (
              services?.map((service, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{service?.serviceName}</td>
                  <td className="p-2 border">{service?.gender}</td>
                  <td className="p-2 border">{service?.status}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleEditService(service._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
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
      </div>
    </div>
  );
};

export default AdminServices;
