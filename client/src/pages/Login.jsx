import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";


const Login = () => {
  const pendingBooking  = useSelector((state) => state.booking.pendingBooking); // ✅ correct way
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      

      if (data.success) {
        toast.success(data.message || "Login successful");
        dispatch(setCredentials({
          user: data.user,
          accessToken: data.accessToken,
        }));
        
        // Navigate to home/dashboard
        if(data.user.role === "admin"){
            navigate("/admin/dashboard/");
        } else{
         if (pendingBooking) {
           navigate("/booking"); // redirect back
        } else {
            navigate("/"); // normal redirect
        }}
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (user) {
    if(user.role === "admin"){
      navigate("/admin/dashboard/");
    } else if (pendingBooking){
      navigate("/booking");
    }
  }
}, [user, pendingBooking, navigate]);


  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="w-[700px] bg-[url('https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fEhhaXIlMjBjdXR8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center hidden md:block relative">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold tracking-wide">
            Welcome to <span className="text-pink-400">StyleWave</span>
          </h1>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center text-sm mt-1 mb-6">
            Login to continue to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Links */}
            <div className="flex justify-between text-sm mt-3">
              <Link to="/signup" className="text-pink-500 hover:underline">
                Don't have an account? Sign Up
              </Link>
              <Link to="/forgot-password" className="text-gray-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
