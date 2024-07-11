import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CodingPlatformData from './components/platform.jsx'
import Modal from './components/popup.jsx'
import HomePage from './components/home.jsx'
import Table from './components/table.jsx'
import UpcomingContestPage from './components/upcoming.jsx'
import { BrowserRouter,Route,Routes,Link } from "react-router-dom";
import Landing from './components/loginpage.jsx'
import Register from './components/loguppage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <CodingPlatformData/> */}
    {/* <Modal/> */}
    {/* <HomePage/> */}
    {/* <UpcomingContestPage />     */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
    </Routes>
    <Routes>
        <Route path="/login" element={<div className='bg-slate-900'>  <Landing/>
      </div>} /> 
     
      <Route path='/register' element={<div className='bg-slate-900'> 
      <Register/>
      </div>}/>
      <Route path='/dash' element={<App/>} />
      <Route path='/cal' element={<UpcomingContestPage/>} />
      {/* <Route path='/nav' element={<Navbar/>} /> */}
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)