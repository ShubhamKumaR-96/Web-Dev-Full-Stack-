const express = require("express");
const jwt=require("jsonwebtoken")
const JWT_SCERET="JWT_SCERET"

const app = express();
app.use(express.json());

const users = [];

// function generateToken(){
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
//         'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
//         'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
//          'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2',
//           '3', '4', '5', '6', '7', '8', '9'];

//         let token=''

//         for (let i=0;i<=options.length;i++){
//             token+=options[Math.floor(Math.random()*options.length)]
//         }
//         return token
// }

// replacing token logic to jsonwebtoken 

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username:username, password:password });

  res.json({
    msg:"you are signed in"
  })
});

app.post("/signin", (req, res) => {
    const username=req.body.username
    const password=req.body.password

    const user=users.find((user)=> user.username===username && user.password===password)

    if (user){
        const token=jwt.sign({
          username:user.username
        },JWT_SCERET)
        user.token=token

        res.send({
            token
        })
        console.log(users)
    }else{
        res.status(403).send({
            msg:"Invalid username and passward"
        })
    }

});

app.get('/me',(req,res)=>{
  const token=req.headers.token
  const userDetails=jwt.verify(token,JWT_SCERET)

  const username=userDetails.username
  const user=users.find((tkn)=> tkn.token===token)

  if(user){
    res.json({
      username:user.username,
      password:user.password
    })
  }else{
    res.json("inavlid account or user not singned up")
  }

})

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
