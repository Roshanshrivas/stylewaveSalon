import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const stylists = [
  {
    id: 1,
    name: "Roshan Shrivas",
    role: "Senior Hair Stylist",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHZf7VrXB_f2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723051414328?e=2147483647&v=beta&t=L55eu2wDUsn6B1DuvZgN8XLKTwDq4-OaZFQlmrA48lI",
    instagram: "#",
    facebook: "#",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Makeup Artist",
    image:
      "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWU1OTM2NTYwLTgyNDItMTFmMC04NDliLWQxMWMzZjNiMjVlNy5qcGc=",
    instagram: "#",
    facebook: "#",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Color Specialist",
    image:
      "https://menshaircuts.com/wp-content/uploads/2025/08/teen-boy-haircuts-undercut-spiky-top-683x1024.jpg",
    instagram: "#",
    facebook: "#",
  },
];

const MeetOurStylists = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-pink-50">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
        Meet Our <span className="text-pink-500">Stylists</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        Our expert team is here to bring out the best version of you with style,
        precision, and creativity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {stylists.map((stylist) => (
          <div
            key={stylist.id}
            className="group relative rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:border-pink-400 transition-all duration-500"
          >
            {/* Image with hover zoom */}
            <div className="overflow-hidden">
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Text */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition">
                {stylist.name}
              </h3>
              <p className="text-gray-500">{stylist.role}</p>
            </div>

            {/* Overlay Social Links */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition duration-500">
              <a
                href={stylist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href={stylist.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurStylists;
