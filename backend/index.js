import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { addAbout, addLinks, addProfile, getAbout, getLinks, getPlatformUserData, getUser, userLogin, userLogUp } from './controllers/user.controllers.js'
import checkContests from './controllers/contest.controllers.js'
import scheduleJobs from './job/scheduler.js'
import getRecentContests from './controllers/recentContest.controllers.js'

dotenv.config()

const app = express();
app.use(express.json())

app.use(cors());

connectDB()

app.post("/signin", userLogin)
app.post("/signup", userLogUp)
app.post("/addprofile", addProfile)
app.post("/data", getPlatformUserData)
// to get contests list of different platforms
app.get("/getContestsList", checkContests)
// to get recent contests list
app.post("/getRecentContests", getRecentContests) // has to provide {"username":"Rusty"} in request body
app.post("/addAbout", addAbout)
app.post("/getAbout", getAbout);
app.post("/addlinks", addLinks)
app.post("/getLinks", getLinks);
app.post("/getUser", getUser);
app.listen(8000, () => {
    console.log('server running on http://localhost:8000')
    // scheduling the job for fetching 
    scheduleJobs();
})