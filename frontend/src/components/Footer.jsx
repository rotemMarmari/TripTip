import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <ul className="flex mt-4 md:mt-0 space-x-4">
          <li>
            <a
              href="#"
              className="text-blue-400 hover:underline"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-blue-400 hover:underline"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-blue-400 hover:underline"
              aria-label="Contact Us"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Middle Section: Footer Links */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; 2025 TripTip. All rights reserved.</p>
          <p className="text-sm mt-2">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/rotemMarmari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Rotem Marmari
            </a>
          </p>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="flex mt-4 md:mt-0 space-x-4">
          <a
            href="https://github.com/rotemMarmari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-500 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-blue-400 px-3 py-1 rounded-lg hover:bg-blue-300 transition"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/rotem-marmari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-blue-700 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
