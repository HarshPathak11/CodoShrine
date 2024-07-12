import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
// import CalendarView from './CalendarView';
import Table from './table';
import { Link } from 'react-router-dom';


const UpcomingContestPage = () => {
  const [contestList,setContestList]=React.useState([])

   React.useEffect(()=>{
    async function getContests(){
      const response=await  fetch('http://localhost:5000/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        }
      });
      if(response.ok){
        const data=await response.json()
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
        const b=transformContestData(data)
        console.log(b);
        setContestList(b)      
      }
    }
    getContests()
   },[])
    const contests = [
        { platform: 'Codeforces', contest: 'Codeforces Round #690', date: '2024-07-12', time: '17:00 UTC' },
        { platform: 'LeetCode', contest: 'Weekly Contest 250', date: '2024-07-13', time: '14:30 UTC' },
        { platform: 'AtCoder', contest: 'AtCoder Beginner Contest 200', date: '2024-07-14', time: '12:00 UTC' },
        { platform: 'HackerRank', contest: 'Week of Code 40', date: '2024-07-15', time: '10:00 UTC' },
        { platform: 'Codeforces', contest: 'Codeforces Round #691', date: '2024-07-18', time: '18:00 UTC' },
        { platform: 'LeetCode', contest: 'Biweekly Contest 55', date: '2024-07-20', time: '15:00 UTC' },
        { platform: 'AtCoder', contest: 'AtCoder Grand Contest 50', date: '2024-07-21', time: '13:00 UTC' },
        { platform: 'HackerRank', contest: 'CodeSprint 10', date: '2024-07-22', time: '11:00 UTC' },
        { platform: 'Codeforces', contest: 'Codeforces Round #692', date: '2024-07-25', time: '17:30 UTC' },
        { platform: 'LeetCode', contest: 'Weekly Contest 251', date: '2024-07-27', time: '14:00 UTC' },
        { platform: 'AtCoder', contest: 'AtCoder Beginner Contest 201', date: '2024-07-28', time: '12:30 UTC' },
        { platform: 'HackerRank', contest: 'HourRank 34', date: '2024-07-29', time: '09:00 UTC' },
        { platform: 'Codeforces', contest: 'Codeforces Round #693', date: '2024-08-01', time: '16:00 UTC' },
        { platform: 'LeetCode', contest: 'Biweekly Contest 56', date: '2024-08-03', time: '15:30 UTC' },
        { platform: 'AtCoder', contest: 'AtCoder Grand Contest 51', date: '2024-08-04', time: '11:00 UTC' },
        { platform: 'HackerRank', contest: 'Week of Code 41', date: '2024-08-05', time: '08:00 UTC' }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [view, setView] = useState('table'); // 'table' or 'calendar'

    const [navbarSolid, setNavbarSolid] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarSolid(true);
    } else {
      setNavbarSolid(false);
    }
  };

  React.useEffect(() => {
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
                {contestList.length!==0 && <Table contests={contestList} searchTerm={searchTerm} selectedPlatform={selectedPlatform} />}
            </div>
        </div>
    );
};


export default UpcomingContestPage;
