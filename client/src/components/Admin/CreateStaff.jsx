import React from 'react'
import StaffForm from './StaffForm'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateStaff = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/staff/create`,
        data,
        {
          headers: {Authorization: `Bearer ${accessToken}`},
          withCredentials:true,
        }
      )
      if(res?.data?.success) {
        toast.success("Staff Create");
        navigate("/admin/dashboard/staff");
      }
    } catch (error) {
      toast.error("Failed to Create Staff!")
    }
  }

  return (
    <div>
      <StaffForm onSubmit={handleCreate}/>
    </div>
  )
}

export default CreateStaff