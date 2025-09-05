import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import bg22 from "../assets/bg22.jpg";
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";
import bg4 from "../assets/bg4.png";
import bg5 from "../assets/bg5.png";
import bg6 from "../assets/bg6.jpg";
import bg7 from "../assets/bg7.jpg";

const Carousel = () => {
  const slides = [
    {
      image: bg1,
      heading: "✨ Transform Your Look ✨",
      subText: "Experience premium grooming & styling at StyleWave Salon.",
    },
    {
      image: bg22,
      heading: "💇‍♂️ Perfect Haircuts",
      subText: "Trendy cuts starting at just Rs.59/-",
    },
    {
      image: bg3,
      heading: "🧖 Premium Facials",
      subText: "Relax & glow with our luxury facial treatments.",
    },
    {
      image: bg4,
      heading: "🎨 Stylish Coloring",
      subText: "Add colors to your personality with expert hair coloring.",
    },
    {
      image: bg5,
      heading: "🔥 Beard Styling",
      subText: "Sharp, clean, and stylish beard grooming.",
    },
    {
      image: bg6,
      heading: "🌸 Skin Care",
      subText: "Gentle treatments to refresh and rejuvenate.",
    },
    {
      image: bg7,
      heading: "💎 Luxury Salon Experience",
      subText: "Step into elegance, step out with confidence.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000); // auto-scroll every 6 sec
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-[75vh] mx-auto overflow-hidden rounded-b-xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay with content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center p-6">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-lg md:text-2xl mb-6 opacity-90 max-w-2xl drop-shadow">
                {slide.subText}
              </p>
              <Link to="/booking">
                <button className="px-8 py-3 bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg hover:shadow-pink-500/50 text-lg font-semibold transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-pink-500 scale-125 shadow-lg shadow-pink-400/50"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
