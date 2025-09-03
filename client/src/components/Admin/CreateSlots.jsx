import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SlotForm from './SlotForm';

const CreateSlots = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/slots/create`, 
          data, 
            {
             headers: { Authorization: `Bearer ${accessToken}` },
             withCredentials: true,
            }
        );
        if(res?.data?.success){
            toast.success("✅ Slot Created");
            navigate("/admin/dashboard/slots");
        }
    } catch (error) {
        toast.error("❌ Failed to create slot");
    }
  }

  return <SlotForm onSubmit={handleCreate}/>
}

export default CreateSlots