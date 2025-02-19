import React from "react";
import { BiSolidEnvelope, BiSolidMap, BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#EFEFEF] text-black py-10">
      <div className="container mx-auto py-10 border-t-2 border-gray-800">
        <div className="mx-4 sm:mx-8 p-2 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Logo Section */}
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="lg:text-3xl xl:text-4xl md:text-2xl text-xl font-redressed text-red-700">
              PanchPokhari Tourism
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              Reach Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidPhoneCall className="lg:text-2xl md:text-xl text-black" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open">
                  +1012 3456 7890
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidEnvelope className="lg:text-2xl md:text-xl text-black" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open">
                  demo@gmail.com
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidMap className="text-3xl md:text-5xl text-black" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open">
                  132 Dartmouth Street, Boston, MA 02156, USA
                </span>
              </li>
            </ul>
          </div>

          {/* PanchPokhari Section */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              PanchPokhari
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-500 text-gray-700 lg:text-base md:text-sm font-Open"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUs"
                  className="hover:text-yellow-500 text-gray-700 lg:text-base md:text-sm font-Open"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              Find Us On
            </h2>
            <ul className="space-y-4">
              {[
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaFacebookF />, label: "Facebook" },
              ].map((social, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start space-x-4"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 text-white">
                    {social.icon}
                  </div>
                  <span className="text-gray-700 text-base font-Open">
                    {social.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
