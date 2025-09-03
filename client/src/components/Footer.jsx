import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Salon Logo + Name */}
        <div>
          <img src={logo} alt="Logo" className='w-[150px]'/>
          <h2 className="text-2xl font-bold mb-2"></h2>
          <p className="text-gray-400">Your One-Stop Unisex Beauty Destination</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <div className="flex items-start gap-2 text-gray-300 mb-2">
            <FaMapMarkerAlt className="mt-1" />
            <span>123 Main Road, Vidisha, MP - 464001</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaPhoneAlt />
            <span>+91 000000000</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <FaEnvelope />
            <span>info@styleWave.com</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Gallery</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaWhatsapp size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4 text-sm">
        © {new Date().getFullYear()} Shine Salon. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
