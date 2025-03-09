const express=require("express")

const mongoose=require("mongoose")
const JWT_SCERET="asdc#$1235"
const { UserModel } = require("./src/config.js/db")
const auth = require("./src/middleware/auth")

mongoose.connect("mongodb://localhost:27017/Todo-App1")

const app=express()

app.use(express.json())

app.post('/signup',async(req , res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        email:email,
        password:password,
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
        password:password
    })
    console.log(user)
    if(user){
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