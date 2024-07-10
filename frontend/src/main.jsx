import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CodingPlatformData from './components/platform.jsx'
import Modal from './components/popup.jsx'
import HomePage from './components/home.jsx'
import Table from './components/table.jsx'
import UpcomingContestPage from './components/upcoming.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <CodingPlatformData/> */}
    {/* <Modal/> */}
    {/* <HomePage/> */}
    <UpcomingContestPage />    
  </React.StrictMode>,
)