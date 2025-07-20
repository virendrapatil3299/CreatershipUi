// components/Footer.tsx
import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#e7b6ac] text-gray-800 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/icon.png" alt="Logo" className="h-8 w-8" /> {/* Replace with actual logo path */}
            <h1 className="text-xl font-bold text-[#e7552c]">
              CREATOR<span className="text-black">SHIPS</span>
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Your journey from spark to success, simplified.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-black bg-white p-2 rounded-full">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-black bg-white p-2 rounded-full">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-black bg-white p-2 rounded-full">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-[#4a1c00]">Quick Links</h3>
          <ul className="space-y-2 text-[#813c00]">
            <li><a href="#">Home</a></li>
            <li><a href="#">Creators</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3 text-[#4a1c00]">Resources</h3>
          <ul className="space-y-2 text-[#813c00]">
            <li><a href="#">About us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
