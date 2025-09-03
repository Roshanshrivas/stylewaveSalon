import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import SlotForm from './SlotForm';
import { useSelector } from 'react-redux';

const EditSlots = () => {
  const {id} = useParams();
  const [slotData, setSlotData] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/slots/getAllSlots/${id}`,
          {
            headers: { Authorization : `Bearer ${accessToken}`},
            withCredentials: true,
          }
        );
        if(res?.data?.success) setSlotData(res.data.data);
      } catch (error) {
        toast.error("❌ Failed to load slot");
      }
    }
    fetchSlot();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/slots/update/${id}`,
        data,
        {
          headers: { Authorization : `Bearer ${accessToken}`},
          withCredentials: true,
        }
      );
      if(res?.data?.success){
        toast.success("✅ Slot Updated");
        navigate("/admin/dashboard/slots");
      }
    } catch (error) {
        toast.error("❌ Failed to Update slot");
    }
  }

  return slotData ? (
    <SlotForm initialData={slotData} onSubmit={handleUpdate} isEdit/>
  ) : (
    <p>Loading...</p>
  );
};

export default EditSlots