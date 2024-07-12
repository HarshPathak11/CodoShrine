import { useState } from 'react'
import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPlus } from 'react-icons/fa';
import CodingPlatformData from './components/platform';
import Modal from './components/popup';
import { useLocation } from 'react-router-dom';
import CodingStatsCard from './components/Card';
function App() {

  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData,setUserData]=useState({});
  const [totalq,setTotalq]=useState(0);
  const [totalcontest,setTotalContest]=useState(0);
  const [list,setList]=useState([])
  const [contestData,setContestData]=useState({})

  const location=useLocation()
  const {username,email,platformProfiles}=location.state

  if(platformProfiles!==undefined && profiles.length===0){
    const arrayOfObjects = Object.entries(platformProfiles);
    console.log(arrayOfObjects)
    setProfiles(arrayOfObjects)
  }

  

  // console.log(username,platformProfiles)

  const addProfile = async (profile) => {
    console.log(profile)
    setIsModalOpen(false);
    const response= await fetch('http://localhost:8000/addprofile',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: JSON.stringify({
        username:username,
        platform:profile.platform,
        platid:profile.username // Assuming you have email and password variables defined somewhere
      })
    });

    if(response.ok){
        const resp=await fetch('http://localhost:8000/data',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
          },
          body: JSON.stringify({
            username:username // Assuming you have email and password variables defined somewhere
          })
        });

        if(resp.ok){
          const data=await resp.json()
          // console.log(data)
          setUserData(data)
          // const a=[profile.platform,{platid:profile.username}]
          // setProfiles([...profiles,a]);
          const existingProfileIndex = profiles.findIndex(p => p[0] === profile.platform);

          // If an existing profile is found, replace it
          if (existingProfileIndex !== -1) {
            const updatedProfiles = [...profiles];
            updatedProfiles[existingProfileIndex] = [profile.platform, { platid: profile.username ,  isId: true }];
            setProfiles(updatedProfiles);
          } else {
            // Otherwise, add the new profile
            setProfiles([...profiles, [profile.platform, { platid: profile.username , isId: true}]]);
          }
        }
    }
    else{
      alert("something went wrong try again!")
    }
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };


  React.useEffect(()=>{
    function transformContestData(data) {
      const transformedData = {
          leetcode: {
              contestNames: [],
              contestRanks: []
          },
          codechef: {
              contestNames: [],
              contestRanks: []
          }
      };
  
      // Process LeetCode contests
      if (data.leetcode && Array.isArray(data.leetcode)) {
          data.leetcode.forEach(contest => {
              if (contest.contest && contest.contest.title && contest.ranking !== undefined) {
                  transformedData.leetcode.contestNames.push(contest.contest.title);
                  transformedData.leetcode.contestRanks.push(contest.rating);
              }
          });
      }
  
      // Process CodeChef contests
      if (data.codechef && Array.isArray(data.codechef)) {
          data.codechef.forEach(contest => {
              if (contest.name && contest.rank !== undefined) {
                  transformedData.codechef.contestNames.push(contest.name);
                  transformedData.codechef.contestRanks.push(contest.rating);
              }
          });
      }
  
      return transformedData;
  }
    async function loadData(){
    const resp=await fetch('http://localhost:8000/data',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: JSON.stringify({
        username:username // Assuming you have email and password variables defined somewhere
      })
    });

    if(resp.ok){
      const data=await resp.json()
      console.log(data)
      setUserData(data)
      // console.log(data.leetcode.totalQuestionSolved,data.codechef.totalQuestionSolved)
      setTotalq(data.leetcode.totalQuestionSolved+data.codechef.totalQuestionSolved)
      setTotalContest(data.leetcode.totalContestsParticipated+data.codechef.totalContestsParticipated)
      setList([data.leetcode.totalQuestionSolved,data.codechef.totalQuestionSolved])
      // console.log(totalq)
    }
    }
    async function getContestData(){
      const res=await fetch('http://localhost:8000/getRecentContests',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify({
          username:username // Assuming you have email and password variables defined somewhere
        })
      });
      if(res.ok){
        const data2=await res.json();
        console.log(data2)
        const x=transformContestData(data2)
        // console.log(x,"x hai ye")
        setContestData(x);
      }
    }
    loadData()
    getContestData()
    // console.log(contestData,"lol")
  },[profiles])
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center ">
      <div className="bg-gray-800 text-white w-[100%] rounded-lg shadow-lg p-6 space-y-6 h-[100%]">
        <nav className="text-center text-2xl font-bold">Navbar</nav>

        <div className='bg-gray-900 grid grid-cols-1 md:grid-cols-2'>

        {/* <div className="bg-gray-900 rounded-lg p-2 md:w-[40vw] text-center text-white"> */}
        <div className="flex justify-center items-center bg-gray-900 p-4">
      <div className="max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Username: {username}</h2>
          <p className="text-gray-400"><FaEnvelope className="inline mr-2"/> {email}</p>
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

        {/* </div> */}
        
        <div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL Q SOLVED 800</div>
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">TOTAL CONTEST GIVEN</div>
            <div className="bg-[#b08968] text-center rounded-lg p-4 border-4 text-xl font-bold mb-4">NO IDEA YHA KYA RKHNA H</div>
          </div> */}
          <div className="bg-gray-900 rounded-lg p-2 md:w-[40vw] text-center text-white flex justify-center">
          <CodingStatsCard tq={totalq} tc={totalcontest} list={list} />
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
   

        {Object.keys(contestData).length !== 0 && <div className="grid grid-flow-row gap-4">
            {profiles.map((obj)=>{return <div className="bg-gray-900 flex justify-center"><CodingPlatformData username={obj[1].platid} platform={obj[0]} userdata={userData} contestData={contestData}/></div>})}
          </div>}
        
      </div>
    </div>
  );
}

export default App
