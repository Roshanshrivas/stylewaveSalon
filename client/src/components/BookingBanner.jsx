// BookingBanner.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookingBanner = () => {
  return (
    <div className="w-full my-8 px-4">
      <div className="rounded-3xl relative w-full bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 py-12 md:py-16 text-center text-white shadow-2xl overflow-hidden">
        
        {/* Decorative Glow Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>

        <h2 className="text-3xl mobile-s:text-2xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
          ✨ Ready for a New Look? ✨
        </h2>
        <p className="text-lg mobile-s:text-[15px] md:text-xl mb-6 opacity-90 max-w-2xl mx-auto">
          Book your appointment today and enjoy a <span className="font-semibold">luxury salon experience</span> with our expert stylists.
        </p>
        
        <Link to="/booking">
          <button className="px-8 py-3 bg-white text-pink-600 font-bold text-lg rounded-full shadow-lg hover:shadow-pink-400/50 hover:scale-105 transition-all duration-300">
            Book Your Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingBanner;
