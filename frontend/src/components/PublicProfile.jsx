import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CodingStatsCard from './Card';
import CodingPlatformData from './platform';

const PublicProfile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState({});
    const [platUserData, setPlatUserData] = useState({});
    const [navbarSolid, setNavbarSolid] = useState(false); // state to track navbar background
    const [totalq, setTotalq] = useState(0);
    const [totalcontest, setTotalContest] = useState(0);
    const [list, setList] = useState([]);
    const [contestData, setContestData] = useState({});
    const [loading, setLoading] = useState(true); // state to track loading status

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data concurrently
                const [userResponse, dataResponse, contestsResponse] = await Promise.all([
                    axios.post('http://localhost:8000/getUser', { username }),
                    axios.post('http://localhost:8000/data', { username }),
                    axios.post('http://localhost:8000/getRecentContests', { username }),
                ]);

                const userData = userResponse.data;
                const data = dataResponse.data;
                const contestData = contestsResponse.data;

                setUserData(userData);
                console.log("User Data: ", userData);
                setPlatUserData(data);
                setTotalq(data.leetcode.totalQuestionSolved + data.codechef.totalQuestionSolved);
                setTotalContest(data.leetcode.totalContestsParticipated + data.codechef.totalContestsParticipated);
                setList([data.leetcode.totalQuestionSolved, data.codechef.totalQuestionSolved]);
                console.log("Total Questions: ", data.leetcode.totalQuestionSolved + data.codechef.totalQuestionSolved);
                console.log("Total Contests: ", data.leetcode.totalContestsParticipated + data.codechef.totalContestsParticipated);
                console.log("List: ", [data.leetcode.totalQuestionSolved, data.codechef.totalQuestionSolved]);

                setContestData(transformContestData(contestData));
                console.log("Contest Data: ", transformContestData(contestData));

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [username]);

    useEffect(() => {
        const handleScroll = () => {
            setNavbarSolid(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const handleLinked = () => {
        window.open(userData.linkedIn, '_blank');
    };

    const handleGit = () => {
        window.open(userData.github, '_blank');
    };

    const handleInsta = () => {
        window.open(userData.insta, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <p className="text-white text-2xl">Loading...</p>
                </div>
            )}
            <nav className={`fixed z-10 top-0 w-full transition-all duration-300 ${navbarSolid ? 'bg-gray-800' : 'bg-gray-500 bg-opacity-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="text-white text-xl font-bold">CodeShrine</div>
                        </div>
                        <div className="">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Link to="/" className='text-white capitalize font-bold tracking-wide'>
                                    <button className='text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded flex items-center'>Why not make yours?</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="bg-gray-800 text-white w-full rounded-lg shadow-lg p-2 md:p-6 space-y-6 h-full mt-16">
                <div className="bg-gray-900 grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-center items-center bg-gray-900 p-2 md:p-4">
                        <div className="md:max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">Username: {username}</h2>
                                <p className="text-gray-400">
                                    <FaEnvelope className="inline mr-2" /> {userData.email}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-semibold mb-2">Social Media</h3>
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
                                </div>
                                <p className="text-gray-400">
                                    {userData.about}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-2 md:w-[40vw] text-center text-white flex justify-center">
                        <CodingStatsCard tq={totalq} tc={totalcontest} list={list} />
                    </div>
                </div>

                {userData.platformProfiles && Object.keys(userData.platformProfiles).length !== 0 && (
                    <div className="grid grid-flow-row gap-4">
                        {Object.entries(userData.platformProfiles).map(([platform, details]) => (
                            <div className="bg-gray-900 flex justify-center" key={platform}>
                                <CodingPlatformData username={details.platid} platform={platform} userdata={platUserData} contestData={contestData} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PublicProfile;
