import React, { useEffect, useState } from 'react';
import Table from './table';
import Navbar from './Navbar';


const UpcomingContestPage = () => {
  const [contestList, setContestList] = React.useState([])

  useEffect(() => {
    async function getContests() {
      const response = await fetch('https://codeshrine.onrender.com/getContestsList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        }
      });
      if (response.ok) {
        const data = await response.json()
        const transformContestData = (data) => {
          const list = [];

          // Process CodeChef contests
          data.codechef.forEach(contest => {
            const startDate = new Date(contest.contest_start_date_iso);
            const formattedDate = startDate.toISOString().split('T')[0]; // Extracting date in YYYY-MM-DD format
            const formattedTime = startDate.toISOString().split('T')[1].split('.')[0]; // Extracting time in HH:MM:SS format

            list.push({
              platform: 'CodeChef',
              contest: contest.contest_name.trim(),
              date: formattedDate,
              time: `${formattedTime} UTC`
            });
          });

          // Process LeetCode contests
          data.leetcode.forEach(contest => {
            const startDate = new Date(contest.contest_start_date);
            const formattedDate = startDate.toISOString().split('T')[0]; // Extracting date in YYYY-MM-DD format
            const formattedTime = startDate.toISOString().split('T')[1].split('.')[0]; // Extracting time in HH:MM:SS format

            list.push({
              platform: 'LeetCode',
              contest: contest.contest_name.trim(),
              date: formattedDate,
              time: `${formattedTime} UTC`
            });
          });

          return list;
        };

        const contests = transformContestData(data);
        // console.log(contests);
        setContestList(contests);
      }
    }

    getContests();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-4xl w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <h2 className="mt-10 text-3xl font-extrabold">Upcoming Programming Contests</h2>
          <p className="mt-2 text-sm text-gray-600">Stay updated with the latest contests from various platforms</p>
        </div>
        <div className="grid grid-flow-row md:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="Search Contests"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 m-2 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 w-64 md:w-auto"
          />
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 m-2 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Platforms</option>
            <option value="Codeforces">Codeforces</option>
            <option value="LeetCode">LeetCode</option>
            <option value="AtCoder">AtCoder</option>
            <option value="HackerRank">HackerRank</option>
          </select>
        </div>
        {contestList.length !== 0 && <Table contests={contestList} searchTerm={searchTerm} selectedPlatform={selectedPlatform} />}
      </div>
      <h1 className='md:hidden text-center flex items-center justify-center gap-3'>Swipe left on table to see info
        <video src="\src\media\svg.mp4" autoPlay muted loop className='w-10 h-10 bg-clip-content'></video>
      </h1>
    </div>
  );
};

export default UpcomingContestPage;
