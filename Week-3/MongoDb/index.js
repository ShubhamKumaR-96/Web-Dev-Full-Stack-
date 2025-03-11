const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const {z} =require("zod")
const JWT_SCERET="asdc#$1235"
const { UserModel } = require("./src/config.js/db")
const auth = require("./src/middleware/auth")

mongoose.connect("mongodb://localhost:27017/Todo-App1")

const app=express()

app.use(express.json())

app.post('/signup',async(req , res)=>{
   const requiredBody=z.object({
    email:z.string().min(3).max(50).email(),
    password:z.string().min(8).max(50),
    name:z.string().min(3).max(50)
   })

   const parseDataWithSuccess=requiredBody.safeParse(req.body)

   if(!parseDataWithSuccess.success){
      res.json({
        message:"IncorrecT format",
        err:parseDataWithSuccess.error
      })
      return
   }

   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;

    
    const hashPassword=await bcrypt.hash(password,5)
    console.log(hashPassword)

    await UserModel.create({
        email:email,
        password:hashPassword,
        name:name
    }),

    res.json({
        meassge:"User Signed In"
    })
})

app.post('/signin',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const user=await UserModel.findOne({
        email:email,
    })
    if (!user){
        res.status(403).json({
            msg:"User doesn't exits in our DB"
        })
    }
    const passwordMatch=await bcrypt.compare(password,user.password)

    console.log(user)
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SCERET);
        res.json({
            token:token
        });
    }else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})

app.post('/todo',auth, (req,res)=>{
    const userId=req.userId

    res.json({
        userId:userId
    })

})

app.post('/todos',auth, (req,res)=>{
    const userId=req.userId

    res.json({
        userId:userId
    })
})






app.listen(3000,()=>{
    console.log("Server running")
})