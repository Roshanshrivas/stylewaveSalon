import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const cardData = [
    {
      title: "Hair Cut",
      description: "Hair cutting starting at just Rs.59/-",
      image:
        "https://img.freepik.com/free-photo/client-doing-hair-cut-barber-shop-salon_1303-20850.jpg",
      link: "/services/haircut",
    },
    {
      title: "Beard Shave",
      description: "Beard shave starting at just Rs.29/-",
      image:
        "https://thebeardclub.com/cdn/shop/articles/cutting_beard_growth_1c6f9f2f-02be-4a6a-8ce4-01100791bdc9_1200x630.jpg?v=1651237897",
      link: "/services/beard",
    },
    {
      title: "Facial",
      description: "Facials starting at just Rs.49/-",
      image:
        "https://blog.californiaskincaresupply.com/wp-content/uploads/2022/04/man-beard-get-facial-1024x684.jpg",
      link: "/services/facial",
    },
    {
      title: "Hair Coloring",
      description: "Hair coloring starting at just Rs.59/-",
      image:
        "https://cdn.citymapia.com/idukki/royal-star-gents-beauty-parlour/21822/Portfolio.jpg?biz=5293",
      link: "/services/coloring",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-pink-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Our <span className="text-pink-500">Services</span>
        </h2>
        <p className="text-lg mt-3 text-gray-600">
          Premium salon care at pocket-friendly prices ✨
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg h-[300px] flex items-end transition transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 p-6 text-left text-white">
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.description}</p>

              <Link to={card.link}>
                <button className="mt-4 px-6 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-md hover:shadow-pink-400/50 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
