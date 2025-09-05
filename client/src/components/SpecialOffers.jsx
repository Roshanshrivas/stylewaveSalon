import React from "react";
import { FaTag } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";
import { CiGift } from "react-icons/ci";


const offers = [
  {
    id: 1,
    title: "✨ First-Time Customer Offer",
    description: "Get 20% off on your first salon visit!",
    code: "WELCOME20",
    highlight: "Limited Time",
  },
  {
    id: 2,
    title: "💍 Bridal Package",
    description: "Exclusive bridal makeup + facial + hairstyle at just ₹4999",
    code: "BRIDAL4999",
    highlight: "Best Seller",
  },
  {
    id: 3,
    title: "🎉 Happy Hours",
    description: "Flat 15% off on bookings between 12 PM - 4 PM (Mon-Fri).",
    code: "HAPPY15",
    highlight: "Hot Deal",
  },
];

const SpecialOffers = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-pink-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
        🎁 Special <span className="text-pink-600">Offers</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 relative z-10">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-lg p-8 text-center border border-pink-100 hover:shadow-2xl transition duration-300 group"
          >
            {/* Badge */}
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-white bg-pink-500 rounded-full">
              {offer.highlight}
            </span>

            {/* Icon */}
            <div className="flex justify-center mb-5">
              {index === 0 && <LuSparkles className="w-12 h-12 text-pink-500" />}
              {index === 1 && <CiGift className="w-12 h-12 text-pink-500" />}
              {index === 2 && <FaTag className="w-12 h-12 text-pink-500" />}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition">
              {offer.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-5">{offer.description}</p>

            {/* Code */}
            <div className="mt-4">
              <span className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium shadow-md">
                Code: {offer.code}
              </span>
            </div>

            {/* Call-to-action */}
            <button className="mt-6 px-6 py-2 bg-pink-100 text-pink-600 font-semibold rounded-lg hover:bg-pink-200 transition">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
