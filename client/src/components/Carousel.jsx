import React, { useEffect, useRef, useState } from "react";
import bg22 from "../assets/bg22.jpg";
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import bg4 from "../assets/bg4.png";
import bg5 from "../assets/bg5.png";
import bg6 from "../assets/bg6.jpg";
import bg7 from "../assets/bg7.jpg";
import { Link } from "react-router-dom";

const Carousel = () => {
  const images = [
    {
      image: bg1,
    },
    {
      image: bg22,
    },
    {
      image: bg3,
    },
    {
      image: bg4,
    },
    {
        image: bg5,
    },
    {
        image: bg6,
        },
        {
        image: bg7,
    }
  ];
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000); // auto-scroll every 6 sec
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-[70vh] mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-[70vh]">
            <img
              src={src.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover "
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center p-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow">
                Book Your Appointment
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-md drop-shadow">
                Experience premium styling and relaxation at StyleWave.
              </p>
              <Link to="/booking" >
                 <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg transition text-white font-semibold">
                   Book Now
                 </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
