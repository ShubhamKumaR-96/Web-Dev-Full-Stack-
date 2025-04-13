
const requestLog=(req,res,next)=>{

    const methods=req.method;

    const url=req.url

    const timeStamps= new Date()

    console.log(`${req.protocol}://${req.get('host')}${req.url}`);

    console.log(timeStamps)
    console.log(methods)
    next()

}

module.exports=requestLog;