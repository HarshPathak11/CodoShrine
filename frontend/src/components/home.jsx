import React, { useEffect, useState } from 'react';
import { FaCode, FaBell, FaLaptop, FaUser, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
        className={`fixed z-10 top-0 w-full transition-all duration-300 ${navbarSolid ? 'bg-gray-800' : 'bg-gray-500 bg-opacity-50'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-xl font-bold">CodeShrine</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/"><a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a></Link>
                <Link  to="/cal" ><a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Upcoming Contests
                </a></Link>
                <Link to="/login"><a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </a></Link>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login"><a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login/Signup
                </a></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-24 pb-32 flex content-center items-center justify-center min-h-screen">
        <div className="absolute top-0 w-full h-full bg-center bg-cover opacity-50">
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="">
                <h1 className="text-white font-semibold text-4xl m-2">
                  Welcome to CodeShrine
                </h1>
                <p className="m-4 text-lg text-gray-300">
                  Your one-stop platform to track and showcase your coding progress.
                </p>
                <Link to="/register"><button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Sign Up Now
                </button></Link>
              </div>
            </div>
            <div className="mt-12 w-full md:w-6/12 px-4 ml-auto mr-auto flex justify-center">
              <img
                src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
                alt="coding"
                className="max-w-full rounded-lg shadow-lg h-[60vw] md:h-[40vw]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Upcoming Contests</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-400">
                Here are the next few contests you don't want to miss.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-4/12 lg:w-3/12 px-4 mb-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-white mb-2">Codeforces Round #690</h4>
                <p className="text-gray-400 mb-2">Date: 2024-07-12</p>
                <p className="text-gray-400 mb-2">Time: 17:00 UTC</p>
                <Link to="/cal"><a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                  View All Contests
                </a></Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                    <FaEnvelope />
                  </div>
                  <h6 className="text-xl font-semibold">Email Support</h6>
                  <p className="mt-2 mb-4 text-gray-400">
                    Get support and assistance through our dedicated email support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">What Our Users Say</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-400">
                Hear from our satisfied users
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                <div className="px-4 py-5 flex-auto">
                  <p className="mt-2 mb-4 text-gray-400">
                    "CodeShrine has helped me track my coding progress and never miss a contest!"
                  </p>
                  <h6 className="text-xl font-semibold text-white">- User 1</h6>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                <div className="px-4 py-5 flex-auto">
                  <p className="mt-2 mb-4 text-gray-400">
                    "The reminders are a lifesaver. I never miss a contest thanks to CodeShrine."
                  </p>
                  <h6 className="text-xl font-semibold text-white">- User 2</h6>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                <div className="px-4 py-5 flex-auto">
                  <p className="mt-2 mb-4 text-gray-400">
                    "I love being able to see all my coding profiles in one place."
                  </p>
                  <h6 className="text-xl font-semibold text-white">- User 3</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4 text-center">
              <h4 className="text-3xl font-semibold text-white">Stay Connected</h4>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-400">
                Follow us on our social media platforms for the latest updates and news.
              </p>
              <div className="mt-6">
                <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaCode />
                </button>
                <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaBell />
                </button>
                <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaLaptop />
                </button>
                <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaUser />
                </button>
                <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaEnvelope />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
