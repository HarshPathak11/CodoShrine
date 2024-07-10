import React, { useState } from 'react';

const Modal = ({ addProfile, cancelModal }) => {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('Leetcode');

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile({ username, platform });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">Add Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            >
              <option value="Leetcode">Leetcode</option>
              <option value="Codechef">Codechef</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={cancelModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
