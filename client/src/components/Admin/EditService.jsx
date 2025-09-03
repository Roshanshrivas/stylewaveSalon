import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {updateService, setLoading} from "../../redux/slices/servicesSlice.js"

const EditService = () => {
  const { id } = useParams(); // 👈 Service ID from URL
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [serviceName, setServiceName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("draft");
  const [subServices, setSubServices] = useState([
    { name: "", price: "", duration: "" },
  ]);

  // ✅ Fetch service details on page load
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/services/getSingleService/${id}`,
          {
            headers: {
           "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        console.log("res", res);
        
        if (res?.data?.success) {
          const service = res.data.data;
          setServiceName(service.serviceName);
          setGender(service.gender);
          setStatus(service.status);
          setSubServices(
            Array.isArray(service?.subServices) && service?.subServices.length > 0 
            ? service?.subServices 
            : [{ name: "", price: "", duration: ""}]
          );
        }
      } catch (error) {
        toast.error("Failed to load service details");
      }
    };
    fetchService();
  }, [id, accessToken]);

   // 🔹 Handle sub-service change
  const handleSubChange = (index, field, value) => {
    const updated = [...subServices];
    updated[index][field] = value;
    setSubServices(updated);
  };


  // 🔹 Add sub-service
  const addSubService = () => {
    setSubServices([...subServices, {name: "", price: "", duration: ""}])
  };


  // 🔹 Remove sub-service
  const removeSubService = (index) =>{
    const updated = subServices.filter((_, i) => i !== index);
    setSubServices(updated)
  };
  

  // ✅ Submit (Update Service)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { serviceName, gender, status, subServices };

    try {
      dispatch(setLoading(true));

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/services/service-update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success("Service updated successfully ✅");
        dispatch(updateService(response.data.data)); //update redux
        navigate("/admin/dashboard/services"); // go back to list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating service!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 mobile-s:p-1 md:p-6 lg:p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Service</h1>
      <p className="text-gray-700 mb-6">Update details of your service.</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl space-y-6"
      >
        {/* Service Name */}
        <div>
          <label className="text-[18px] font-semibold text-pink-600">
            Service Name:
          </label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-[16px] font-semibold text-pink-600">
            Gender:
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-[16px] font-semibold text-pink-600">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        {/* Sub-Services */}
        <div>
          <label className="text-[18px] font-semibold text-pink-600">
            Sub-Services:
          </label>
          {subServices.map((sub, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 mt-2 items-center mobile-s:grid-cols-1 mobile-m:grid-cols-1 mobile-l:grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Sub-service name"
                value={sub.name}
                onChange={(e) => handleSubChange(index, "name", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
              />
              {/* Price */}
              <input
                type="number"
                placeholder="Price (₹)"
                value={sub.price}
                onChange={(e) =>
                  handleSubChange(index, "price", e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
              />
              {/* Duration */}
              <input
                type="text"
                placeholder="Duration (e.g. 30 min)"
                value={sub.duration}
                onChange={(e) =>
                  handleSubChange(index, "duration", e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400"
              />
              {/* Remove */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSubService(index)}
                  className="text-red-600 font-bold ml-2"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSubService}
            className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            + Add Sub-Service
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
