import React, { useEffect, useState } from 'react'

const StaffForm = ({initialData={}, isEdit = false, onSubmit}) => {
  const [name, setName] = useState(initialData.name || "");
  const [role, setRole] = useState(initialData.role || "");
  const [status, setStatus] = useState(initialData.status || "");

  useEffect(() => {
    if(initialData.name) setName(initialData.name);
    if(initialData.role) setRole(initialData.role);
    if(initialData.status) setStatus(initialData.status);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, role, status})
  }
  return (
    <div className='w-full h-full'>
       <h1 className='text-3xl font-bold mb-4'>
        {isEdit ? "Edit Staff" : "Create New Staff"}
       </h1>
       <p className='text-gray-700 mb-6'>
        {isEdit 
          ? "Update the Staff details"
          : "Add a new staff to your salon."}
       </p>

       <form
         onSubmit={handleSubmit}
         className='bg-white p-6 shadow-lg rounded-xl space-y-6'
       >
        {/* staff name */}
        <label className='text-[18px] font-semibold text-pink-600'> 
          Staff Name :
        </label>
        <input 
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
           className='w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400'
        />
        {/* staff specialization */}
        <label className='text-[18px] font-semibold text-pink-600'> 
         specialization :
        </label>
        <input 
           type="text"
           value={role}
           onChange={(e) => setRole(e.target.value)}
           required
           className='w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400'
        />

        {/* staff status */}
        <label className='text-[18px] font-semibold text-pink-600'> 
          Status :
        </label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className='w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400'
        >
          <option value="">--Select Status--</option>
          <option value="Active">Active</option>
          <option value="InActive">InActive</option>
        </select>

        {/* submit */}
        <button
          type="submit"
          className="text-[18px] w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          {isEdit ? "Update Staff" : "Create Staff"}
        </button>
       </form>
    </div>
  )
}

export default StaffForm