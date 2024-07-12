import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { addProfile, getPlatformUserData, userLogin, userLogUp } from './controllers/user.controllers.js'
import checkContests from './controllers/contest.controllers.js'
import scheduleJobs from './job/scheduler.js'
import getRecentContests from './controllers/recentContest.controllers.js'

dotenv.config()

const app=express();
app.use(express.json())

app.use(cors());

connectDB()

app.get("/signin",userLogin)
app.get("/signup",userLogUp)
app.get("/addprofile",addProfile)
app.get("/data",getPlatformUserData)
// to get contests list of different platforms
app.get("/getContestsList", checkContests)
// to get recent contests list
app.get("/getRecentContests", getRecentContests) // has to provide {"username":"Rusty"} in request body


app.listen(8000,()=>{
    console.log('server running on http://localhost:8000')
    //scheduling the job for fetching 
    // scheduleJobs();
})