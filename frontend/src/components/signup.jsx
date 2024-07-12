import React from 'react';
import {redirect, useNavigate} from 'react-router-dom'
const SignUpForm = () => {
  const[name,setName]=React.useState("");
  const[email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [confirmPassword,setConfirm]=React.useState("");

  const navigate=useNavigate();

  async function formOnRegister(event){
    event.preventDefault();
    console.log("ho");

    const response=await fetch("http://localhost:8000/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
      })
    })
    // console.log(response)

    if(response.ok){
      const dataset=await response.json();
      console.log(dataset)
      return navigate('/dash',{state:{username:dataset.username,email:dataset.email,platformProfiles:dataset.platformProfiles}})
    }
    else{
      alert("Username or Email already taken!")
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
      <form onSubmit={formOnRegister} className="w-full max-w-sm p-2">
      <div className="mb-4">
          <label htmlFor="username" className="block text-gray-400">UserName</label>
          <input value={name} onChange={(event)=>setName(event.target.value)} type="text" id="username" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400">Email</label>
          <input value={email} onChange={(event)=>setEmail(event.target.value)} type="email" id="email" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400">Password</label>
          <input value={password} onChange={(event)=>setPassword(event.target.value)} type="password" id="password" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="cnfrmpassword" className="block text-gray-400">Confirm Password</label>
          <input value={confirmPassword} onChange={(event)=>setConfirm(event.target.value)} type="text" id="cnfrmpassword" className="w-full bg-gray-800 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-500 px-4 py-2" />
        </div>
        <div className='flex justify-between'>
        <button type="submit" className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
        <div onClick={()=>{
          navigate('/login')
        }} className="m-2 bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Already Have an Account? Sign In</div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;