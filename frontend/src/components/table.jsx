// import React from 'react';

// const Table = ({ contests, searchTerm, selectedPlatform }) => {
//     const filteredContests = contests.filter(contest => {
//         return (
//             contest.contest.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             (selectedPlatform ? contest.platform === selectedPlatform : true)
//         );
//     });

//     return (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Platform
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Contest
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Date
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Time
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredContests.map((contest, index) => (
//                         <tr key={index} className="hover:bg-gray-100">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm font-medium text-gray-900">{contest.platform}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{contest.contest}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{contest.date}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{contest.time}</div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;
import React from 'react';

const Table = ({ contests, searchTerm, selectedPlatform }) => {
    const filteredContests = contests.filter(contest => {
        return (
            contest.contest.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedPlatform ? contest.platform === selectedPlatform : true)
        );
    });
    // const filteredContests=contests
    // console.log(contests,"hh")
    // console.log('Is filteredContests an array?', Array.isArray(filteredContests));

    return (
        <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Platform
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Contest
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredContests.map((contest,index) => (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-700 odd:bg-white dark:odd:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{contest.platform}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-200">{contest.contest}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-200">{contest.date}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-gray-200">{contest.time}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;

