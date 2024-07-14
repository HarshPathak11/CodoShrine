import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Navbar from "./Navbar";
function Developer() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar className=' block mb-10' />
      <h1 className="text-2xl text-white relative top-24 mb-8 text-center">MEET THE DEVELOPERS</h1>
      <div className=" grid grid-flow-row md:grid-flow-col min-h-screen" >
        <div className="max-w-xl w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6 max-h-72 md:ml-auto mr-1 mt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Harsh Pathak</h2>
            <p className="text-gray-400">
              <a href="mailto:jkpathak83195@gmail.com" className="text-gray-400"><FaEnvelope className="inline mr-2" /> jkpathak83195@gmail.com</a>
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
            </div>
            <div className="flex justify-around items-center">
              <a href="https://www.linkedin.com/in/harsh-pathak-818163298/" className="text-blue-500 hover:text-blue-700">
                <FaLinkedin size={30} />
              </a>
              <a href="https://github.com/HarshPathak11" className="text-gray-100 hover:text-gray-400">
                <FaGithub size={30} />
              </a>
              <a href="https://www.instagram.com/harshpathak_1110/" className="text-pink-500 hover:text-pink-700">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-2">About Me</h3>
            </div>
            <p className="text-gray-400">
              Hi , I am Harsh
            </p>
          </div>
        </div>


        <div className="max-w-xl w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6 max-h-72 md:mr-auto md:ml-1 mt-20 ">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sumit Singh</h2>
            <p className="text-gray-400">
              <a href="mailto:220104066@hbtu.ac.in" className="text-gray-400"><FaEnvelope className="inline mr-2" />220104066@hbtu.ac.in</a>
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
            </div>
            <div className="flex justify-around items-center">
              <a href="https://www.linkedin.com/in/sumit-singh-developer/" className="text-blue-500 hover:text-blue-700">
                <FaLinkedin size={30} />
              </a>
              <a href="https://github.com/Rusty-98" className="text-gray-100 hover:text-gray-400">
                <FaGithub size={30} />
              </a>
              <a href="https://www.instagram.com/rustygenius_98/" className="text-pink-500 hover:text-pink-700">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-2">About Me</h3>
            </div>
            <p className="text-gray-400">
              Hi, I'm Sumit! Please use this platform and share your valuable feedback, whether you have positive experiences, suggestions, or bug reports. We're eager to hear your insights!. <br /><br /> Baki mere bare me janke ke koi kya hi karega ;-)
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Developer;