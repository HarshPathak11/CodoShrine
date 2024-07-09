import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import { addProfile, getPlatformUserData, userLogin, userLogUp } from './controllers/user.controllers.js'

dotenv.config()

const app=express();
app.use(express.json())

app.use(cors());

connectDB()

app.get("/signin",userLogin)
app.get("/signup",userLogUp)
app.get("/addprofile",addProfile)
app.get("/data",getPlatformUserData)


app.listen(8000,()=>{
    console.log('server running on http://localhost:8000')
})