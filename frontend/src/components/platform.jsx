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
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const CodingPlatformData = (props) => {
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

  const lineData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Previous Ratings',
        data: [900, 1600, 1700, 1650, 1750],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="m-2 max-w-5xl w-[80vw] bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-500">{props.platform} Profile</h1>
        <div className='grid grid-flow-row md:grid-cols-2'>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <h3 className="text-xl font-semibold">Total Questions Solved</h3>
            <p className="text-gray-400">500</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Max Rating</h3>
            <p className="text-gray-400">1800</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">No. of Contests Given</h3>
            <p className="text-gray-400">20</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Username</h3>
            <p className="text-gray-400">{props.username}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Problem Distribution</h3>
          <div className=' h-52 flex justify-center'><Pie data={pieData} /></div>
        </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Previous Ratings</h3>
          <div className=' md:h-64 flex justify-center'><Line data={lineData} /></div>
        </div>
       
      </div>

  );
};

export default CodingPlatformData;