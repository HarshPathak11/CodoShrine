import React, { useEffect, useState } from 'react';
import { FaCode, FaBell, FaLaptop, FaUser, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

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
                </h1> <p>Your one-stop platform to track and showcase your coding progress.</p>
                <div className='mt-10 ml-8 text-left'>
                  <h3 className='text-white font-semibold text-2xl m-3'>What is CodeShrine ?</h3>
                  <p className="m-4 text-lg text-gray-300 text-pretty">
                    With the increasing popularity of Competitive Programming, it's easy to lose track of upcoming coding contests and challenges across various platforms. Missing out on valuable contests can be frustrating. But worry no more! With CodeShrine, you can effortlessly keep track of all your contest profiles in one place and never miss another competition.

                    Simply sign up with an active email, and add your coding platform profiles to start receiving reminders of the upcoming contests for the particular platform . CodeShrine is your one-stop platform to monitor and showcase your coding progress. Stay on top of your game and ensure you never miss an opportunity to compete and improve.
                  </p></div>
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

      {/* <section className="bg-gray-800 py-20">
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
      </section> */}

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
                    "Knowledge is power, and CodeShrine is a treasure trove. Imagine having all your coding profiles in one place and tracking upcoming contests effortlessly. It's like having a map to navigate the coding world. CodeShrine is my indispensable companion, helping me achieve my goals and share my journey with others."
                  </p>
                  <h6 className="text-xl font-semibold text-white">- Nico Robin</h6>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                <div className="px-4 py-5 flex-auto">
                  <p className="mt-2 mb-4 text-gray-400">
                    "With CodeShrine, I can see all my coding profiles in one place and never miss a contest. It's like seeing infinity in a single glance! The reminders are a lifesaver, and sharing my profile with friends and rivals has never been easier. CodeShrine keeps me sharp and ready for the next big challenge."
                  </p>
                  <h6 className="text-xl font-semibold text-white">- Satoru Gojo</h6>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-8 shadow-lg rounded-lg p-6">
                <div className="px-4 py-5 flex-auto">
                  <p className="mt-2 mb-4 text-gray-400">
                    "Believe it! CodeShrine is my secret weapon to track upcoming contests and share my coding journey with friends. Dattebayo! Whether it's seeing all my profiles in one place or getting crucial reminders, CodeShrine keeps me pumped and ready for every challenge. It's a must-have for every coding ninja!"
                  </p>
                  <h6 className="text-xl font-semibold text-white">- Naruto Uzumaki</h6>
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
                Check the About section to follow us on our social media platforms for the latest updates and news. To report any feedback, contact us below:
              </p>
              <div className="mt-6">
                <button className="" type="button">
                  <a href="mailto:jkpathak83195@gmail.com" className='flex text-gray-300'><FaEnvelope className='m-1' />  codeshrine98@gmail.com</a>
                </button>
                {/* <button className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
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
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
