import React from "react";
import { FaSpa, FaUserTie, FaRegClock } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { TiScissorsOutline } from "react-icons/ti";
import { HiScissors } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Services = () => {
  const serviceMen = [
    { name: "Hair Cut", price: "Rs. 200/-", icon: <TiScissorsOutline /> },
    { name: "Beard Styling", price: "Rs. 150/-", icon: <HiScissors /> },
    { name: "Facial & Cleanup", price: "Rs. 500/-", icon: <TiScissorsOutline /> },
    { name: "Head Massage", price: "Rs. 250/-", icon: <HiScissors /> },
    { name: "WAX", price: "Rs. 200/-", icon: <TiScissorsOutline /> },
    { name: "D-TAN", price: "Rs. 200/-", icon: <HiScissors /> },
    { name: "Hair Colour", price: "Rs. 200/-", icon: <TiScissorsOutline /> },
    { name: "Wedding Package", price: "Rs. 200/-", icon: <FaScissors /> },
  ];
  const serviceWomen = [
    { name: "Hair Cut/Styling", price: "Rs. 199/-", icon: <TiScissorsOutline /> },
    { name: "BLEACH", price: "Rs. 149/-", icon: <HiScissors /> },
    { name: "Facial & Cleanup", price: "Rs. 500/-", icon: <TiScissorsOutline /> },
    { name: "Waxing", price: "Rs. 100/-", icon: <HiScissors /> },
    { name: "Threading", price: "Rs. 20/-", icon: <TiScissorsOutline /> },
    { name: "D-TAN", price: "Rs. 200/-", icon: <HiScissors /> },
    { name: "Hair Colour", price: "Rs. 200/-", icon: <TiScissorsOutline /> },
    { name: "Wedding Package", price: "Rs. 3,000/-", icon: <FaScissors /> },
    { name: "Bridal Make Up", price: "Rs. 1000/-", icon: <FaScissors /> },
    { name: "Party Make Up", price: "Rs. 499/-", icon: <FaScissors /> },
    { name: "Engagement Make Up", price: "Rs. 599/-", icon: <FaScissors /> },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-br from-pink-50 to-pink-100 p-5">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-pink-700 mb-3">Our Services</h1>
      <p className="text-gray-600 text-center max-w-2xl text-[18px]">
        Enhance your style with our premium grooming and salon services. 
        Experience luxury at affordable prices.
      </p>

      {/* Card Container */}
      <div className="w-[80vw] mx-auto mt-10 flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full mx-auto md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Salon Service"
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute inset-0 bg-pink-600 bg-opacity-30"></div> */}
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-pink-700 mb-5">
            Men’s Services
          </h2>

          {/* Services List */}
          <div className="space-y-4">
            {serviceMen.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-lg text-gray-800"
              >
                <span className="flex items-center gap-2 font-medium">
                  {service.icon} {service.name}
                </span>
                <span className="font-semibold text-pink-600">{service.price}</span>
              </div>
            ))}
            <Link to="/">
              <p className="text-lg underline mt-8 text-pink-600 hover:text-pink-700 font-semibold">More..</p>
            </Link>
          </div>

          {/* Button */}
          <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
            Book Now
          </button>
        </div>
      </div>

      {/* Card Container women*/}
      <div className="w-[80vw] mx-auto mt-10 flex flex-col md:flex-row bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full mx-auto md:w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1664048713210-9db5ee2a7e08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Salon Service"
            className="object-cover w-full h-full"
          />
          {/* <div className="absolute inset-0 bg-pink-600 bg-opacity-30"></div> */}
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-pink-700 mb-5">
            Women's Services
          </h2>

          {/* Services List */}
          <div className="space-y-4">
            {serviceWomen.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-lg text-gray-800"
              >
                <span className="flex items-center gap-2 font-medium">
                  {service.icon} {service.name}
                </span>
                <span className="font-semibold text-pink-600">{service.price}</span>
              </div>
            ))}
            <Link to="/">
              <p className="text-lg underline mt-8 text-pink-600 hover:text-pink-700 font-semibold">More..</p>
            </Link>
          </div>

          {/* Button */}
          <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
