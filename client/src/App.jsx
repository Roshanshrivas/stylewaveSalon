import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import TopOffers from "./components/TopOffers";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./components/Admin/Dashboard";
import Orders from "./components/Admin/Orders";
import Payments from "./components/Admin/Payments";
import AdminServices from "./components/Admin/AdminServices";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import axios from "axios";
import axiosInstance from "./utils/axiosInstance";
import { logout, setCredentials } from "./redux/slices/authSlice";
import CreateServices from "./components/Admin/CreateServices";
import EditService from "./components/Admin/EditService";
import Slots from "./components/Admin/Slots";
import EditSlots from "./components/Admin/EditSlots";
import CreateSlots from "./components/Admin/CreateSlots";
import Staff from "./components/Admin/Staff";
import EditStaff from "./components/Admin/EditStaff";
import CreateStaff from "./components/Admin/CreateStaff";
import BookingForm from "./components/BookingForm";


const MainLayout = () => (
  <>
    <TopOffers/>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/booking",
        element: <BookingForm />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },{
    path: "/admin/dashboard",
    element: (
      <PrivateRoute role="admin">
        <AdminDashboard/>
      </PrivateRoute>
    ),
    children:[
      // Additional admin routes can be added here
      {
        path: "",
        element: <Dashboard/>
      },
      {
        path: "orders",
        element: <Orders/>
      },
      {
        path: "payments",
        element: <Payments/>
      },
      {
        path: "services",
        element: <AdminServices/>
      },
      {
        path: "services/create",
        element: <CreateServices/>
      },
      {
        path: "services/:id",
        element: <EditService/>
      },
      {
        path: "slots",
        element: <Slots/>
      },
      {
        path: "slots/:id",
        element: <EditSlots/>
      },
      {
        path: "slots/create",
        element: <CreateSlots/>
      },
      {
        path: "staff",
        element: <Staff/>
      },
      {
        path: "staff/:id",
        element: <EditStaff/>
      },
      {
        path: "staff/create",
        element: <CreateStaff/>
      },
    ]
  }
]);
const App = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshLogin = async () =>{
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        dispatch(setCredentials({
          user: res.data.user,
          accessToken: res.data.accessToken,
        }));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    refreshLogin();
  }, [dispatch]);

  if(loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
