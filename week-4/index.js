import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"

dotenv.config()
const app=express()

app.use(cors({
    origin:"http://localhost:3044",
    methods:['GET','POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const port=process.env.Port || 3044

app.get('/',(req,res)=>{
    res.json("I am here")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})