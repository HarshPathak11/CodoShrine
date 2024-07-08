import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config(
    {
        path:'./env'
    }
)

const app=express();
app.use(express.json())

app.use(cors());


app.listen(8000,()=>{
    console.log('server running on http://localhost:8000')
})