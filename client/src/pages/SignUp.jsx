import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "user",
    secureKey: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Prepare data to send
       const dataToSend = { ...formData };

    // Send secureKey only if role is admin
    if (formData.role !== "admin") {
      delete dataToSend.secureKey;
    }

      const response = await axios.post("http://localhost:3000/api/v1/auth/signup", dataToSend, {
        headers: {
          "Content-Type" : "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setMessage("Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          contactNumber: "",
          role: "user",
          secureKey: "",
        });
        navigate("/login");
      } else {
        setMessage(response.data.message || "Signup failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center text-sm mt-1 mb-6">
            Already have an account? <a href="/login" className="text-pink-500">Login</a>
          </p>

          {message && (
            <p className={`mb-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your First Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Your Last Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Secure Key for Admin */}
            {formData.role === "admin" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Admin Secure Key</label>
                <input
                  type="text"
                  name="secureKey"
                  value={formData.secureKey}
                  onChange={handleChange}
                  placeholder="Enter Secure Key"
                  required={formData.role === "admin"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
