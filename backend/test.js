import express from 'express'
import cors from 'cors'
import { getLeetData } from './controllers/user.controllers.js';

const app=express();

app.use(express.json())
app.use(cors())

app.get("/",getLeetData)

app.listen(5000,()=>{
    console.log("running");
})