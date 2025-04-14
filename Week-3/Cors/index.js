const express=require('express')
const cors=require("cors")

const app=express()

app.use(cors())

app.use(express.json())

app.post('/sum',(req,res)=>{
    const a=parseInt(req.body.a)
    const b=parseInt(req.body.b)

    res.json({
        answer:a+b
    })
    console.log(a,b)

})


app.listen(4001, () => {
    console.log('Server running on http://localhost:4001');
  });