import React, { useEffect, useState } from 'react';
import { FaCode, FaBell, FaLaptop } from 'react-icons/fa';

const HomePage = () => {
  const [navbarSolid, setNavbarSolid] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSolid(true);
    } else {
      setNavbarSolid(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav
        className={`fixed z-10 top-0 w-full transition-all duration-300 ${
          navbarSolid ? 'bg-gray-800' : 'bg-gray-500 bg-opacity-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-xl font-bold">CodoShrine</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  SignIn/SignUp
                </a>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-24 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="absolute top-0 w-full h-full bg-center bg-cover opacity-50" >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="">
                <h1 className="text-white font-semibold text-5xl m-2">
                  Welcome to CodoShrine
                </h1>
                <p className="m-4 text-lg text-gray-300">
                  Your one-stop platform to track and showcase your coding progress.
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Get Started
                  </button>
              </div>
            </div>
            <div className="mt-12 w-full md:w-6/12 px-4 ml-auto mr-auto flex justify-center">
              <img src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg" alt="coding" className="max-w-full rounded-lg shadow-lg h-[60vw]p-12 md:h-[40vw]" />
            </div>
          </div>
        </div>
      </header>
      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">WHAT WE PROVIDE</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Explore the benefits of using our platform
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                    <FaCode />
                  </div>
                  <h6 className="text-xl font-semibold">Track Your Code Profiles</h6>
                  <p className="mt-2 mb-4 text-gray-400">
                    Keep a record of all your coding activities across different platforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-yellow-500">
                    <FaBell />
                  </div>
                  <h6 className="text-xl font-semibold">Get Timely Contest Reminders</h6>
                  <p className="mt-2 mb-4 text-gray-400">
                    Never worry about missing a coding contest with our timely email reminders.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-500">
                    <FaLaptop />
                  </div>
                  <h6 className="text-xl font-semibold">Show All Your Work at One Place</h6>
                  <p className="mt-2 mb-4 text-gray-400">
                    Integrate all your coding profiles to showcase your work seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      </div>)
}

export default HomePage