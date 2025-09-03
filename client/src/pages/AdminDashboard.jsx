import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);

  const initials =
    (user?.firstName.charAt(0) || "").toUpperCase() +
    (user?.lastName.charAt(0) || "").toUpperCase();

  const handleLogout = () => {
    dispatch(logout()); // clear redux + localStorage
    navigate("/login"); // redirect to login page
  };

  const isActive = (path) => {
    return location.pathname === path 
    ? "bg-pink-500" 
    : ""
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-[#111827] text-white flex justify-between items-center p-3 shadow-md">
        <img src={logo} alt="Logo" className="w-16 h-14 object-contain" />
        <div className="hidden md:flex space-x-4">
          <Link
            to="/profile"
            className="flex items-center space-x-2 py-2 rounded hover:bg-gray-700"
          >
            <p className="text-[18px] font-semibold">{user?.firstName}</p>
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
        </div>

        <div className="md:hidden flex">
          <button onClick={toggleMenu}>
            {isOpen ? <RxCross2 size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#1F2937] text-white space-y-2 py-4 px-6 absolute top-16 left-0 w-full h-full">
          <Link to="/profile">
          <div className="flex items-center gap-2">
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
            <p>{user?.firstName || "Admin"}</p>
            </div>
          </Link>
          <Link
            to="/admin/dashboard/"
            onClick={toggleMenu}
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${isActive("/admin/dashboard/")}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/dashboard/orders"
            onClick={toggleMenu}
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${isActive("/admin/dashboard/orders")}`}
          >
            Orders
          </Link>
          <Link
            to="/admin/dashboard/payments"
            onClick={toggleMenu}
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${isActive("/admin/dashboard/payments")}`}
          >
            Payments
          </Link>
          <Link
            to="/admin/dashboard/services"
            onClick={toggleMenu}
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${isActive("/admin/dashboard/services")}`}
          >
            Services
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded bg-pink-500 text-white font-semibold text-center mt-2"
          >
            Logout
          </button>
        </nav>
      )}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:w-64 text-lg font-semibold flex-col bg-[#1F2937] text-white p-4 space-y-3">
          <Link
            to={"/admin/dashboard/"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/")}`}
          >
            Dashboard
          </Link>
          <Link
            to={"/admin/dashboard/orders"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/orders")}`}
          >
            Appointments
          </Link>
          <Link
            to={"/admin/dashboard/payments"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/payments")}`}
          >
            Payments
          </Link>
          <Link
            to={"/admin/dashboard/services"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/services")}`}
          >
            Services
          </Link>
          <Link
            to={"/admin/dashboard/slots"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/slots")}`}
          >
           Time Slots
          </Link>
          <Link
            to={"/admin/dashboard/staff"}
            className={`py-2 px-4 rounded hover:bg-pink-600 ${isActive("/admin/dashboard/staff")}`}
          >
            Staff
          </Link>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 bg-gray-50">
          {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
