import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from 'lucide-react';
import logo from "../assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, 
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(logout());
        toast.success(res.data.message);
        setIsOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  const initials =
    (user?.firstName.charAt(0) || "").toUpperCase() +
    (user?.lastName.charAt(0) || "").toUpperCase();

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Salon Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Salon Logo"
            className="w-14 h-14 object-contain"
          />
          <span className="text-[20px] font-bold tracking-wide text-pink-400">
            StyleWave
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-[17px] font-medium items-center">
          <Link to="/" className="hover:text-pink-400 transition">
            Home
          </Link>
          <Link to="/services" className="hover:text-pink-400 transition">
            Services
          </Link>
          <Link to="/about" className="hover:text-pink-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-pink-400 transition">
            Contact
          </Link>
          {token ? (
            <>
              <button onClick={handleLogout} className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600">
                Logout
              </button>
              <Link
                to="/profile"
              >
                {user?.profileImage ? (
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    className="w-10 h-10 rounded-full bg-accent"
                  />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-lg font-semibold">
                    {initials}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <RxCross2 size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-4 text-center">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block hover:text-pink-400"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={toggleMenu}
            className="block hover:text-pink-400"
          >
            Services
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block hover:text-pink-400"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="block hover:text-pink-400"
          >
            Contact
          </Link>
          {token ? (
            <>
              <button onClick={handleLogout} className="w-full py-2 bg-pink-500 rounded hover:bg-pink-600">
                Logout
              </button>
              <Link
                to="/profile"
              >
                {user?.profileImage ? (
                  <img
                    src={
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    className="w-10 h-10 rounded-full bg-accent"
                  />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-lg font-semibold">
                    {initials}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 bg-pink-500 rounded hover:bg-pink-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 bg-gray-700 rounded hover:bg-gray-800"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
