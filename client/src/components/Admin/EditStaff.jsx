import React, { useEffect, useState } from 'react'
import StaffForm from './StaffForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';

const EditStaff = () => {
  const {id} = useParams();
  const [staffData, setStaffData] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
   const fetchStaff = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/staff/getall/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials:true,
        }
      );
      if(res?.data?.success) setStaffData(res.data.data);
    } catch (error) {
      toast.error("Failed to load Staff!!");
    }
  }
  fetchStaff();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/staff/update/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );
      if(res?.data?.success){
        toast.success("Staff Updated");
        navigate("/admin/dashboard/staff");
      }
    } catch (error) {
      toast.error("Failed to Update Staff!!");
    }
  }
  
  return staffData ? (
      <StaffForm initialData={staffData} onSubmit={handleUpdate} isEdit/>
  ) : (
    <p>Loading...</p>
  );
};

export default EditStaff