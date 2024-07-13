import React, { useState } from 'react';

function SocialMediaForm({ handleMediaForm }) {
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //make a api to submit the form
    alert(` submitted Instagram: ${instagram}\nGitHub: ${github}\nLinkedIn: ${linkedin}`);
    // You can also handle the form submission here, such as sending the data to a backend server
    handleMediaForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      <div className="relative max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <button
          onClick={handleMediaForm}
          className="absolute top-2 right-2 bg-red-600 p-1 w-10 h-10 flex items-center justify-center text-3xl text-white font-extrabold rounded-md hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Submit Your Social Media Profile Links</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="instagram" className="block text-gray-400 text-sm font-bold mb-2">
              Instagram Profile Link:
            </label>
            <input
              type="url"
              id="instagram"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://instagram.com/yourprofile"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="github" className="block text-gray-400 text-sm font-bold mb-2">
              GitHub Profile Link:
            </label>
            <input
              type="url"
              id="github"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/yourprofile"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="linkedin" className="block text-gray-400 text-sm font-bold mb-2">
              LinkedIn Profile Link:
            </label>
            <input
              type="url"
              id="linkedin"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SocialMediaForm;
