// SignInForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [load, setLoad] = React.useState(false)

  const navigate = useNavigate();

  const notMatched = () => toast.error("Email or Password dont match! Try Again.");

  async function formonSubmit(event) {
    //  console.log(event)
    event.preventDefault();
    setLoad(true)
    const response = await fetch('https://codoshrine.onrender.com/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
      },
      body: JSON.stringify({
        email: email,
        password: password // Assuming you have email and password variables defined somewhere
      })
    });

    if (response.ok) {
      const dataset = await response.json();
      // console.log(dataset)
      setLoad(false)
      return navigate('/dash', { state: { username: dataset.username, email: dataset.email, platformProfiles: dataset.platformProfiles } })
    }
    else {
      notMatched()
      setEmail("");
      setPassword("");
      setLoad(false)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign In</h2>
      <form onSubmit={formonSubmit} className="w-full max-w-sm p-2">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400">Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="email" className="w-full rounded-sm bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400">Password</label>
          <input value={password} onChange={(event) => { setPassword(event.target.value) }} type="password" id="password" className="w-full rounded-sm bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className='flex justify-between'>
          <button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
          <div onClick={() => {
            navigate('/register')
          }} className="m-2 bg-red-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Don't Have an Account? Sign Up</div>
        </div>
        {load && <div className='flex justify-center'><svg xmlns="http://www.w3.org/2000/svg" className='h-10' viewBox="0 0 200 200"><radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#B9FF40"></stop><stop offset=".3" stop-color="#B9FF40" stop-opacity=".9"></stop><stop offset=".6" stop-color="#B9FF40" stop-opacity=".6"></stop><stop offset=".8" stop-color="#B9FF40" stop-opacity=".3"></stop><stop offset="1" stop-color="#B9FF40" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a10)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#B9FF40" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg></div>}
      </form>
      <Toaster />
    </div>
  );
};

export default SignInForm;