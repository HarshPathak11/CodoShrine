import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const CodingPlatformData = ({ username, platform, userdata, contestData }) => {
  const platData = userdata[platform]
  const contData = contestData[platform]
  const pieData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [300, 200, 100],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };
  const [newLabels, setNew] = React.useState(['1', '2', '3', '4', '5'])
  React.useEffect(() => {
    const updateLabels = () => {
      const width = window.innerWidth;


      if (width < 768) { // Mobile
        setNew(['1', '2', '3', '4', '5']);
      } else { // Tablet and Laptop
        setNew(contData.contestNames);
      }
    }
    updateLabels()
    console.log(newLabels)
  }, [])

  const lineData = {
    // labels: contData.contestNames,
    labels: newLabels,
    datasets: [
      {
        label: 'Previous Ratings',
        data: contData.contestRanks,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        borderWidth: 3.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Color of the vertical grid lines
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Color of the horizontal grid lines
        },
      },
    },
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
    <div className="m-2 w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-500">{platform[0].toUpperCase() + platform.slice(1)} Profile</h1>
      {/* <div className='flex items-center'>
        <div className='grid grid-flow-row md:grid-cols-2 w-[55%]'>
          <div className="grid grid-cols-2 gap-2 mb-2 w-full">
            <div>
              <h3 className="text-xl font-semibold">Total Questions Solved</h3>
              <p className="text-gray-400">{platData && platData.totalQuestionSolved}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Max Rating</h3>
              <p className="text-gray-400">{platData && platData.contestRating.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">No. of Contests Given</h3>
              <p className="text-gray-400">{platData && platData.totalContestsParticipated}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Username</h3>
              <p className="text-gray-400">{username}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Previous Ratings</h3>
          <div className=' md:h-64 flex justify-center'><Line data={lineData} /></div>
        </div>
      </div> */}
      <div className='flex flex-col md:flex-row items-center'>
        <div className='grid grid-flow-row md:grid-cols-2 w-full md:w-[55%]'>
          <div className="grid grid-flow-row md:grid-cols-2 gap-2 mb-2 w-full">
            <div>
              <h3 className="text-xl font-semibold">Total Questions Solved</h3>
              <p className="text-gray-400">{platData && platData.totalQuestionSolved}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Max Rating</h3>
              <p className="text-gray-400">{platData && platData.contestRating.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">No. of Contests Given</h3>
              <p className="text-gray-400">{platData && platData.totalContestsParticipated}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Username</h3>
              <p className="text-gray-400">{username}</p>
            </div>
          </div>
          {/* Uncomment if needed
    <div>
      <h3 className="text-xl font-semibold mb-4">Problem Distribution</h3>
      <div className=' h-52 flex justify-center'><Pie data={pieData} /></div>
    </div> */}
        </div>
        <div className='w-full md:w-auto'>
          <h3 className="text-xl font-semibold mb-4">Previous Ratings</h3>
          <div className='h-[70vw] mt-6 md:mt-0 md:w-[40vw] md:h-64 md:flex md:justify-center'><Line data={lineData} options={chartOptions} /></div>
        </div>
      </div>


    </div>

  );
};

export default CodingPlatformData;
