import {
  BiSolidEnvelope,
  BiSolidMap,
  BiSolidPhoneCall,
} from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useGetSiteSettingsQuery } from "../../Services/SiteSettingApi";

const Footer = () => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isLogInPage = location.pathname === "/login";
  const isResetPage = location.pathname.startsWith("/reset-password");

  const { data, isLoading, error } = useGetSiteSettingsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading site settings.</div>;

  const defaultSettings = {
    name: "PanchPokhari Tourism",
    phoneNumber: "+1012 3456 7890",
    email: "demo@gmail.com",
    address: "132 Dartmouth Street, Boston, MA 02156, USA",
    district: "",
    facebookLink: "#",
    instagramLink: "#",
    twitterLink: "#",
    linkedinLink: "#",
    logo: null,
  };

  const siteSettings = { ...defaultSettings, ...data };
  const {
    name,
    phoneNumber,
    email,
    address,
    district,
    facebookLink,
    instagramLink,
    twitterLink,
    linkedinLink,
    logo,
  } = siteSettings;

  return (
    <footer
      className={`${
        isSignUpPage || isLogInPage || isResetPage
          ? "hidden"
          : "bg-[#EFEFEF] text-black py-10"
      }`}
    >
      <div className="container mx-auto py-10 border-t-2 border-gray-800">
        <div className="mx-4 sm:mx-8 p-2 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Logo & Name */}
          <div className="text-center md:text-left w-full md:w-auto">
            {logo && (
              <img
                src={`/uploads/${logo}`}
                alt="Logo"
                className="h-12 mb-2 mx-auto md:mx-0"
              />
            )}
            <p className="lg:text-3xl xl:text-4xl md:text-2xl text-xl font-redressed text-red-700">
              {name}
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              Reach Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidPhoneCall className="lg:text-2xl md:text-xl text-black" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open">
                  {phoneNumber}
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidEnvelope className="lg:text-2xl md:text-xl text-black flex-shrink-0" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open overflow-hidden text-ellipsis whitespace-nowrap">
                  {email}
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4">
                <BiSolidMap className="text-xl md:text-2xl text-black flex-shrink-0" />
                <span className="text-gray-700 lg:text-base md:text-sm font-Open overflow-hidden text-ellipsis whitespace-nowrap">
                  {address}, {district}
                </span>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              {name}
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

          {/* Social Media Links */}
          <div className="text-center md:text-left max-w-72 min-w-48 px-2 w-full md:w-auto">
            <h2 className="lg:text-xl font-bold md:text-sm text-yellow-500 mb-4">
              Find Us On
            </h2>
            <ul className="space-y-4">
              {[
                { icon: <FaTwitter />, label: "Twitter", link: twitterLink },
                { icon: <FaInstagram />, label: "Instagram", link: instagramLink },
                { icon: <FaFacebookF />, label: "Facebook", link: facebookLink },
                { icon: <FaLinkedinIn />, label: "LinkedIn", link: linkedinLink },
              ].map((social, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start space-x-4"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-700 text-white">
                    {social.icon}
                  </div>
                  <a
                    href={social.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    aria-label={social.label}
                    className="text-gray-700 text-base font-Open hover:text-yellow-500"
                  >
                    {social.label}
                  </a>
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
