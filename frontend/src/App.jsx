import { useState, useEffect } from 'react';
import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPlus, FaSpinner, FaShareAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import CodingPlatformData from './components/platform';
import Modal from './components/popup';
import CodingStatsCard from './components/Card';
import SocialMediaForm from './components/SocialMediaForm';
import AboutMeForm from './components/AboutMeForm';
import axios from 'axios';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [totalq, setTotalq] = useState(0);
  const [totalcontest, setTotalContest] = useState(0);
  const [list, setList] = useState([]);
  const [contestData, setContestData] = useState({});
  const [mediaForm, setMediaForm] = useState(false);
  const [aboutForm, setAboutForm] = useState(false);
  const [loading, setLoading] = useState(false); // state to track loading
  const [navbarSolid, setNavbarSolid] = useState(false); // state to track navbar background
  const [aboutme, setAboutMe] = useState("-");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const location = useLocation();
  const { username, email, platformProfiles } = location.state;

  useEffect(() => {
    if (platformProfiles && profiles.length === 0) {
      const arrayOfObjects = Object.entries(platformProfiles);
      setProfiles(arrayOfObjects);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarSolid(true);
      } else {
        setNavbarSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [platformProfiles, profiles]);

  const transformContestData = (data) => {
    const transformedData = {
      leetcode: {
        contestNames: [],
        contestRanks: [],
      },
      codechef: {
        contestNames: [],
        contestRanks: [],
      },
    };

    if (data.leetcode && Array.isArray(data.leetcode)) {
      data.leetcode.forEach((contest) => {
        if (contest.contest?.title && contest.ranking !== undefined) {
          transformedData.leetcode.contestNames.push(contest.contest.title);
          transformedData.leetcode.contestRanks.push(contest.rating);
        }
      });
    }

    if (data.codechef && Array.isArray(data.codechef)) {
      data.codechef.forEach((contest) => {
        if (contest.name && contest.rank !== undefined) {
          transformedData.codechef.contestNames.push(contest.name);
          transformedData.codechef.contestRanks.push(contest.rating);
        }
      });
    }

    return transformedData;
  };

  const loadData = async () => {
    const resp = await fetch('http://localhost:8000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    if (resp.ok) {
      const data = await resp.json();
      setUserData(data);
      setTotalq(data.leetcode.totalQuestionSolved + data.codechef.totalQuestionSolved);
      setTotalContest(data.leetcode.totalContestsParticipated + data.codechef.totalContestsParticipated);
      setList([data.leetcode.totalQuestionSolved, data.codechef.totalQuestionSolved]);
    }
  };

  const getContestData = async () => {
    const res = await fetch('http://localhost:8000/getRecentContests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    if (res.ok) {
      const data2 = await res.json();
      const x = transformContestData(data2);
      setContestData(x);
    }
  };

  const addProfile = async (profile) => {
    setIsModalOpen(false);
    setLoading(true); // start loading

    const response = await fetch('http://localhost:8000/addprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        platform: profile.platform,
        platid: profile.username,
      }),
    });

    if (response.ok) {
      await loadData();
      await getContestData();

      const existingProfileIndex = profiles.findIndex((p) => p[0] === profile.platform);

      if (existingProfileIndex !== -1) {
        const updatedProfiles = [...profiles];
        updatedProfiles[existingProfileIndex] = [profile.platform, { platid: profile.username, isId: true }];
        setProfiles(updatedProfiles);
      } else {
        setProfiles([...profiles, [profile.platform, { platid: profile.username, isId: true }]]);
      }
    } else {
      alert('Something went wrong, please try again!');
    }

    setLoading(false); // end loading
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData();
    getContestData();
  }, [username]);

  const handleMediaForm = async () => {
    setMediaForm(!mediaForm);
    try {
      const response = await axios.post('http://localhost:8000/getLinks', {
        username
      })

      if (response.status === 200) {
        setLinkedinLink(response.data.linkedIn);
        setGithubLink(response.data.github);
        setInstaLink(response.data.insta);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      alert('An error occurred while fetching your links. Please try again later.');
    }
  };

  const handleAboutForm = async () => {
    setAboutForm(!aboutForm);
    try {
      // Handle submission of aboutMe
      const response = await axios.post('http://localhost:8000/getAbout', {
        username
      });

      if (response.status === 200) {
        setAboutMe(response.data.about);
      }

    } catch (error) {
      console.error('Error submitting About Me:', error);
      alert('An error occurred while submitting your About Me. Please try again later.');

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linksResponse = await axios.post('http://localhost:8000/getLinks', {
          username
        });

        if (linksResponse.status === 200) {
          console.log(linksResponse.data);
          setLinkedinLink(linksResponse.data.linkedIn);
          setGithubLink(linksResponse.data.github);
          setInstaLink(linksResponse.data.insta);
        }
      } catch (error) {
        console.error('Error fetching links:', error);
        alert('An error occurred while fetching your links. Please try again later.');
      }

      try {
        const aboutResponse = await axios.post('http://localhost:8000/getAbout', {
          username
        });

        if (aboutResponse.status === 200) {
          setAboutMe(aboutResponse.data.about);
        }
      } catch (error) {
        console.error('Error fetching About Me:', error);
        alert('An error occurred while fetching your About Me. Please try again later.');
      }
    };

    fetchData();
  }, [username])

  const handleLinked = () => {
    window.open(linkedinLink, '_blank');
  }

  const handleGit = () => {
    window.open(githubLink, '_blank');
  }

  const handleInsta = () => {
    window.open(instaLink, '_blank');
  }

  const getProfileLink = () => {
    const profileUrl = `${window.location.origin}/profile/${username}`;
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        console.log('Profile URL copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying profile URL to clipboard:', error);
      });

  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
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
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>
                <Link to="/cal">
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Upcoming Contests
                  </a>
                </Link>
                <Link to="/login">
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </a>
                </Link>
                <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login">
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login/Signup
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gray-800 text-white w-[100%] rounded-lg shadow-lg p-2 md:p-6 space-y-6 h-[100%] mt-16">
        <div className="bg-gray-900 grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center bg-gray-900 p-2 md:p-4">
            <div className="md:max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className=''>
                  <h2 className="text-2xl font-bold">Username: {username}</h2>
                  <p className="text-gray-400">
                    <FaEnvelope className="inline mr-2" /> {email}
                  </p>
                </div>
                <button onClick={getProfileLink} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded flex items-center">
                  <FaShareAlt className="mr-2" />
                  Share Profile
                </button>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                  <button
                    onClick={handleMediaForm}
                    className="rounded-lg mb-2 text-white"
                  >
                    <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                </div>
                <div className="flex justify-around items-center">
                  <div onClick={handleLinked} className="text-blue-500 hover:text-blue-700">
                    <FaLinkedin size={30} />
                  </div>
                  <div onClick={handleGit} className="text-gray-100 hover:text-gray-700">
                    <FaGithub size={30} />
                  </div>
                  <div onClick={handleInsta} className="text-pink-500 hover:text-pink-700">
                    <FaInstagram size={30} />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold mb-2">About Me</h3>
                  <button
                    onClick={handleAboutForm}
                    className="rounded-lg mb-2 text-white"
                  >
                    <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                </div>
                <p className="text-gray-400">
                  {aboutme}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-2 md:w-[40vw] text-center text-white flex justify-center">
            <CodingStatsCard tq={totalq} tc={totalcontest} list={list} />
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 flex items-center justify-center"
          disabled={loading} // disable button while loading
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaPlus className="mr-2" />
          )}
          {loading ? 'Adding...' : 'Add Profile'}
        </button>
        {isModalOpen && <Modal addProfile={addProfile} cancelModal={cancelModal} />}
        {mediaForm && <SocialMediaForm handleMediaForm={handleMediaForm} username={username} />}
        {aboutForm && <AboutMeForm handleAboutForm={handleAboutForm} username={username} />}

        {Object.keys(contestData).length !== 0 && (
          <div className="grid grid-flow-row gap-4">
            {profiles.map((obj) => (
              <div className="bg-gray-900 flex justify-center" key={obj[0]}>
                <CodingPlatformData username={obj[1].platid} platform={obj[0]} userdata={userData} contestData={contestData} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
