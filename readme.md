<!-- hello this is a test file ;-) -->

<!-- new app -->

<!-- import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPlus } from 'react-icons/fa';
import CodingPlatformData from './components/platform';
import Modal from './components/popup';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProfile = (profile) => {
    setProfiles([...profiles, profile]);
    setIsModalOpen(false);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  // Sample contest history data
  const contestHistory = [
    { id: 1, platform: 'Codeforces', contest: 'Codeforces Round #737 (Div. 2)', date: '2023-05-15' },
    { id: 2, platform: 'AtCoder', contest: 'AtCoder Beginner Contest 201', date: '2023-05-16' },
    { id: 3, platform: 'LeetCode', contest: 'Weekly Contest 252', date: '2023-05-17' },
    { id: 4, platform: 'HackerRank', contest: 'HourRank 55', date: '2023-05-18' },
    { id: 5, platform: 'CodeChef', contest: 'June Challenge 2023', date: '2023-06-01' },
    { id: 6, platform: 'TopCoder', contest: 'SRM 800', date: '2023-06-05' },
    // Add more sample data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* Navbar Section */}
      <nav className="bg-gray-800 w-full">
        <div className="max-w-[80vw] mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-white text-2xl font-bold">Logo</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-white hover:text-gray-300">Profile</a>
            <a href="#" className="text-white hover:text-gray-300">Settings</a>
            <a href="#" className="text-white hover:text-gray-300">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-gray-800 text-white w-full max-w-[80vw] rounded-lg shadow-lg p-6 space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Section */}
          <div className="bg-gray-900 rounded-lg p-4 md:w-[40vw] text-center text-white">
            <div className="max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Username: John Doe</h2>
                <p className="text-gray-400"><FaEnvelope className="inline mr-2" /> john.doe@example.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                <div className="flex justify-around">
                  <a href="https://www.linkedin.com" className="text-blue-500 hover:text-blue-700">
                    <FaLinkedin size={30} />
                  </a>
                  <a href="https://www.github.com" className="text-gray-500 hover:text-gray-700">
                    <FaGithub size={30} />
                  </a>
                  <a href="https://www.instagram.com" className="text-pink-500 hover:text-pink-700">
                    <FaInstagram size={30} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">About Me</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque, urna eget tincidunt aliquam,
                  nisi erat volutpat nunc, et bibendum odio sapien nec massa. Integer vitae fermentum est, eget pulvinar libero.
                </p>
              </div>
            </div>
          </div>

          {/* Contest History Section */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Contest History</h2>
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-4">
                {contestHistory.map((contest) => (
                  <div key={contest.id} className="bg-gray-800 text-white rounded-lg p-2">
                    <p className="text-lg font-semibold">{contest.contest}</p>
                    <p className="text-gray-400"><strong>Platform:</strong> {contest.platform}</p>
                    <p className="text-gray-400"><strong>Date:</strong> {contest.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Linked Profiles Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL Q SOLVED 800</div>
          <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL CONTEST GIVEN</div>
          <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">NO IDEA YHA KYA RKHNA H</div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus className="inline mr-2" /> Add Profile
        </button>
        {isModalOpen && <Modal addProfile={addProfile} cancelModal={cancelModal} />}

        <div className="grid grid-flow-row gap-4">
          {profiles.map(({ username, platform }) => (
            <div key={username} className="bg-gray-900 flex justify-center">
              <CodingPlatformData username={username} platform={platform} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App; -->
