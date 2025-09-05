import React from "react";

const WhyCardsSection = () => {
  const cards = [
    {
      title: "Expert Stylists",
      description: "Our team consists of highly trained professionals.",
      image:
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2017/11/13115431/Bounce-4.png",
    },
    {
      title: "Quality Products",
      description: "We use only the best products for your hair and skin.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNtV-CnyRM3Wm1YKiofjl0vdkBoYfyhLltQ&s",
    },
    {
      title: "Relaxing Atmosphere",
      description: "Enjoy a calm and soothing environment during your visit.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUprk9nXHDzeJwpSNEdZV26O_0zQSy2pH0g&s",
    },
    {
      title: "Affordable Prices",
      description: "Get premium services at competitive prices.",
      image:
        "https://images.pexels.com/photos/17784002/pexels-photo-17784002/free-photo-of-a-woman-in-a-hair-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-pink-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Why Choose <span className="text-pink-500">StyleWave?</span>
        </h2>
        <p className="text-lg mt-3 text-gray-600 max-w-2xl mx-auto">
          Experience luxury salon care with expert stylists, premium products,
          and a relaxing atmosphere – all at prices you’ll love.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg h-[350px] flex items-end transition transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Text Content */}
            <div className="relative z-10 p-6 text-left text-white">
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyCardsSection;
