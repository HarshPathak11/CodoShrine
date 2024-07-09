import express from 'express'
import cors from 'cors'
import { getPlatformUserData } from './controllers/user.controllers.js';


const app=express();

app.use(express.json())
app.use(cors())

app.get("/",getPlatformUserData)

app.listen(5000,()=>{
    console.log("running");
})