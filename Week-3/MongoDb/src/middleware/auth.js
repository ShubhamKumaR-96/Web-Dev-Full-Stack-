const jwt=require("jsonwebtoken")
const JWT_SCERET="asdc#$1235"

function auth(req,res,next){
    const token=req.headers.token;

    const decodeData=jwt.verify(token,JWT_SCERET)

    if(decodeData){
        req.userId=decodeData.id;
        next()
    }else{
        res.status(403).json({
            meassge:"Incorrect credentials"
        })
    }
}

module.exports= auth;