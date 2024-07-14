import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [navbarSolid, setNavbarSolid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSolid(true);
    } else {
      setNavbarSolid(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed z-10 top-0 w-full transition-all duration-300 ${navbarSolid ? 'bg-gray-800' : 'bg-gray-500 bg-opacity-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">CodeShrine</div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              </Link>
              <Link to="/cal">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Upcoming Contests</a>
              </Link>
              <Link to="/login">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</a>
              </Link>
              <Link to="/about">
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</a>
          </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/login">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login/Signup</a>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleDropdown} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          <Link to="/">
            <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</a>
          </Link>
          <Link to="/cal">
            <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Upcoming Contests</a>
          </Link>
          <Link to="/login">
            <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Profile</a>
          </Link>
          <Link to="/about">
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</a>
          </Link>
          <Link to="/login">
            <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login/Signup</a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
