import { useState } from 'react'
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
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center ">
      <div className="bg-gray-800 text-white w-[100%] rounded-lg shadow-lg p-6 space-y-6 h-[100%]">
        <nav className="text-center text-2xl font-bold">Navbar</nav>

        <div className='grid grid-cols-1 md:grid-cols-2'>

        <div className="bg-gray-900 rounded-lg p-2 md:w-[40vw] text-center text-white">
        <div className="flex justify-center items-center bg-gray-900 p-4">
      <div className="max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Username: John Doe</h2>
          <p className="text-gray-400"><FaEnvelope className="inline mr-2"/> john.doe@example.com</p>
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

        </div>
        
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL Q SOLVED 800</div>
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL CONTEST GIVEN</div>
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">NO IDEA YHA KYA RKHNA H</div>
          </div>
          
        </div>
        </div>
        
        <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        <FaPlus className="inline mr-2" /> Add Profile
      </button>
      {isModalOpen && <Modal addProfile={addProfile} cancelModal={cancelModal} />}
   

        <div className="grid grid-flow-row gap-4">
            {profiles.map(({username,platform})=>{return <div className="bg-gray-900 flex justify-center"><CodingPlatformData username={username} platform={platform}/></div>})}
          </div>
        
      </div>
    </div>
  );
}

export default App
