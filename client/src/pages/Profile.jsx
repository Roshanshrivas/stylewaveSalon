import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg">Please log in to view your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[50%] mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {/* Common Details */}
        <div className="mb-6">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        {/* Role-Specific Sections */}
        {user.role === "user" && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">User Dashboard</h2>
            <p>📅 View and book appointments</p>
            <p>💳 Manage subscriptions</p>
          </div>
        )}

        {user.role === "admin" && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Admin Dashboard</h2>
            <p>✅ Approve/Reject Appointments</p>
            <p>📊 View all orders & reports</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
