import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AboutMeForm({ handleAboutForm, username }) {
  const [aboutMe, setAboutMe] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading state

  const copySuccess = () => toast.success('Successfully submitted About Me');
  const copyError = () => toast.error('Some error occurred');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 300) {
      setAboutMe(inputValue);
      setErrorMessage('');
    } else {
      setErrorMessage('Maximum 300 characters allowed.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while submitting
    try {
      const response = await axios.post('https://codoshrine.onrender.com/addAbout', {
        username: username,
        about: aboutMe
      });

      if (response.status === 200) {
        copySuccess();
      } else {
        copyError();
      }
      handleAboutForm();
    } catch (error) {
      console.error('Error submitting About Me:', error);
      copyError();
    } finally {
      setLoading(false); // Reset loading state after submission completes
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      <div className="relative max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <button
          onClick={handleAboutForm}
          className="absolute top-2 right-2 bg-red-600 p-1 w-10 h-10 flex items-center justify-center text-3xl text-white font-extrabold rounded-md hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Tell Us About Yourself</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="aboutMe" className="block text-gray-400 text-sm font-bold mb-2">
              About Me:
            </label>
            <textarea
              id="aboutMe"
              className={`w-full h-32 text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errorMessage ? 'border-red-500' : ''
                }`}
              placeholder="Tell us about yourself..."
              value={aboutMe}
              onChange={handleChange}
              required
            ></textarea>
            {errorMessage && (
              <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AboutMeForm;
