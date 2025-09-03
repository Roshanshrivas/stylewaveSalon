// components/TopOffers.jsx
import React from 'react';
import { FaGift } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

const TopOffers = () => {
  return (
    <div className="w-full bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 text-white py-2 px-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left animate-fadeIn">
      <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
        <FaGift className="text-yellow-200 text-lg animate-bounce" />
        <span>
          🎉 <strong className="underline underline-offset-2">20% OFF</strong> on all Hair & Facial Services!
        </span>
      </div>
      <a
        href="/services"
        className="flex items-center gap-1 text-white hover:underline text-sm sm:text-base font-semibold"
      >
        Explore Now <FaArrowRightLong className="mt-[2px]" />
      </a>
    </div>
  );
};

export default TopOffers;
