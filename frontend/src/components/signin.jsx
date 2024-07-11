// SignInForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  
  const navigate=useNavigate();
  async function formonSubmit(event){
     console.log(event)
      event.preventDefault();
      const response= await fetch('http://localhost:8000/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: JSON.stringify({
          email: email,
          password: password // Assuming you have email and password variables defined somewhere
        })
      });
      
      if(response.ok){
        const dataset=await response.json();
        console.log(dataset)
        return navigate('/dash',{state:{name:dataset.name,count:dataset.count,blogs:dataset.blogs}})
      }
      else{
        alert("Email or Password dont match! Try Again.")
        setEmail("");
        setPassword("");
      }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign In</h2>
      <form onSubmit={formonSubmit} className="w-full max-w-sm p-2">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400">Email</label>
          <input value={email} onChange={(event)=>setEmail(event.target.value)} type="email" id="email" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400">Password</label>
          <input value={password} onChange={(event)=>{setPassword(event.target.value)}} type="password" id="password" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className='flex justify-between'>
        <button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
        <div onClick={()=>{
          navigate('/register')
        }} className="m-2 bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Don't Have an Account? Sign Up</div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;