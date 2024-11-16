import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 gap-6 lg:gap-0">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">Mini CRM</h2>
            <p className="text-sm mt-2">
              Simplifying customer relationships and campaign management for businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            {/* <Link to="/campaigns" className="hover:text-white">Campaigns</Link> */}
            <Link to="/audience" className="hover:text-white">Audience Management</Link>
            {/* <Link to="/reports" className="hover:text-white">Reports</Link> */}
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Footer Bottom */}
        <div className="mt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mini CRM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
