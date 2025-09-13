import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
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
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleQuickBook = () => {
    document.getElementById("booking-section")?.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  const initials =
    (user?.firstName?.[0] || "").toUpperCase() +
    (user?.lastName?.[0] || "").toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Salon Name */}
        <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Salon Logo" className="w-14 h-14 object-contain" />
        <div>
          <span className="text-[20px] font-bold tracking-wide text-pink-400">
            StyleWave
          </span>
          <p className="text-xs text-gray-400 -mt-1">Unisex Salon & parlour</p>
        </div>
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

          {/* Quick Booking Button */}
          <button
            onClick={handleQuickBook}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-medium hover:scale-105 transition"
          >
            Quick Book
          </button>

          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-lg font-semibold text-black">
                    {initials}
                  </span>
                )}
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    onClick={() => setDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
        <div className="md:hidden bg-black px-4 pb-4 space-y-4 text-center mx-auto">
          <Link to="/" onClick={toggleMenu} className="block hover:text-pink-400">
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

          {/* Quick Booking in Mobile */}
          <button
            onClick={handleQuickBook}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-medium hover:scale-105 transition"
          >
            Quick Book
          </button>

          {token ? (
            <>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="block py-2 bg-gray-800 rounded"
              >
                Profile
              </Link>
              <Link
                to="/my-bookings"
                onClick={toggleMenu}
                className="block py-2 bg-gray-800 rounded"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-pink-500 rounded hover:bg-pink-600"
              >
                Logout
              </button>
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
