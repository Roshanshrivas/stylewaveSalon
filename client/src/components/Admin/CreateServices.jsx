import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"; 
import { addService, setLoading } from "../../redux/slices/servicesSlice";

const CreateServices = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serviceName, setServiceName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("draft");
  const [subServices, setSubServices] = useState([
    { name: "", price: "", duration: "" },
  ]);


  // handle subservice change
  const handleSubChange = (index, field, value) => {
    const updated = [...subServices];
    updated[index][field] = value;
    setSubServices(updated);
  };

  // add subservice
  const addSubService = () => {
    setSubServices([...subServices, { name: "", price: "", duration: "" }]);
  };

  // remove subservice
  const removeSubService = (index) => {
    const updated = subServices.filter((_, i) => i !== index);
    setSubServices(updated);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName || !gender || subServices.some(s => !s.name || !s.price || !s.duration)) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const serviceData = {
      serviceName,
      gender,
      status,
      subServices,
    };
    // 🔗 send this to backend via API (POST request)
    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/services/service-create`,
        serviceData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

        if(response?.data?.success){
            toast.success("Service Created Successfully");
            dispatch(addService(response.data.data));
            navigate("/admin/dashboard/services")
            // Reset form
            setServiceName("");
            setGender("");
            setStatus("draft");
            setSubServices([{ name: "", price: "", duration: "" }]);
        }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in Creating service, Please Try Again!!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 mobile-s:p-1 md:p-6 lg:p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Service</h1>
      <p className="text-gray-700 mb-6">
        Add a new service to your salon offerings.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl space-y-6"
      >
        {/* Service Name */}
        <div>
          <label className="text-[18px] font-semibold text-pink-600">
            Service Name :
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
        <div className="">
          <label className="text-[18px] font-semibold text-pink-600">
            Sub-Services:
          </label>
          {subServices.map((sub, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 mt-2 items-center mobile-s:grid-cols-1 mobile-m:grid-cols-1 mobile-l:grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
            >
              {/* Sub Service Name */}
              <input
                type="text"
                placeholder="Sub-service name (e.g. Gold Facial)"
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
              {/* Remove Button */}
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
          Save Service
        </button>
      </form>
    </div>
  );
};

export default CreateServices;
