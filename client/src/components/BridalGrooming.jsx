// components/BridalGrooming.jsx
import React from "react";
import { Link } from "react-router-dom";


const BridalGrooming = () => {
 const bridalData=[
    {
        title: "HD & Airbrush Makeup",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://dimplemakeovers.in/wp-content/uploads/2024/03/HD-Makeup-Vs.-Airbrush-Makeup-Which-One-Is-Better-For-Brides-2048x1152-1.jpg"
    },
    {
        title: "Pre-Bridal/Groom Packages",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://dreamweddinghub.com/public/uploads/blog_images/1751614863-Happy%20Family%20(3).webp"
    },
    {
        title: "Hair Styling & Saree Draping",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://i.ytimg.com/vi/hh5SYnKHu4Q/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB3njWpr3i0HI-JhcTioom6zg_Fow"
    },
    {
        title: "Facials & Skin Treatments",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://sashaclinics.com/wp-content/uploads/2024/08/different-kinds-of-facial-treatments-you-must-know-az-wilson-aesthetics.jpg"
    },
    {
        title: "Mehndi & Nail Art",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://cdn0.weddingwire.in/article/8676/3_2/1280/jpg/96768-nail-art-designs.jpeg"
    },
    {
        title: "Free Consultation + Trial",
        subTitle: "Expert service for a perfect wedding look.",
        image:"https://images.squarespace-cdn.com/content/v1/5b27fc6bf8370a153fa68550/1537542630142-BPHYV30CYQK6BSEQCCNZ/41681745060_92298d2028_o.jpg?format=1500w"
    },
]


  return (
    <section className="py-12 bg-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-4">
          Bridal & Groom Grooming Packages
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Make your wedding day truly special with our expert bridal and groom
          grooming services. Shine with confidence and elegance.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {bridalData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl px-2 pt-5 pb-2 text-center hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {item.subTitle}
              </p>
              <div className="">
                <img src={item.image} alt="" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/booking">
             <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
                Book Your Bridal Session Now
             </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BridalGrooming;
