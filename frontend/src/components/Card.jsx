import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CodingStatsCard = (props) => {
  const data = {
    labels: ['LeetCode', 'CodeChef'],
    datasets: [
      {
        label: '# of Questions',
        data: [300, 150], // Example data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-sm bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-6 m-4">
      <h2 className="text-xl font-bold mb-4">Total Questions Solved: <p className=' text-gray-400'>450</p></h2>
      <h2 className="text-xl font-bold mb-4">Total Contests Given: <p className=' text-gray-400'>50</p></h2>
      <div className="relative h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CodingStatsCard;
