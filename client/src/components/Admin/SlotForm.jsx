import React, { useState, useEffect } from "react";

const SlotForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");

  // ⚡ Important: Update when initialData changes (for edit case)
  useEffect(() => {
    if (initialData.date) setDate(initialData.date.split("T")[0]); // format for input[type="date"]
    if (initialData.time) setTime(initialData.time);
  }, [initialData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold mb-4">
        {isEdit ? "Edit Slot" : "Create New Slot"}
      </h1>
      <p className="text-gray-700 mb-6">
        {isEdit
          ? "Update the slot details."
          : "Add a new slot to your salon offerings."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl space-y-6"
      >
        {/* Slot Date */}
        <div>
          <label className="text-[18px] font-semibold text-pink-600">
            Slot Date :
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="text-[18px] font-semibold text-pink-600">
            Slot Time :
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="text-[18px] w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          {isEdit ? "Update Slot" : "Create Slot"}
        </button>
      </form>
    </div>
  );
};

export default SlotForm;
