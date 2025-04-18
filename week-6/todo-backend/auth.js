const JWT_SECRET = "JWT_SECRET";
const jwt = require("jsonwebtoken");


function auth(req, res, next) {
    const token = req.headers.token;
    const decodeInfo = jwt.verify(token, JWT_SECRET);
  
    if (decodeInfo) {
      req.userId = decodeInfo.id;
      next();
    } else {
      res.status(403).json({
        msg: "Invalid Credentials",
      });
    }
  }

module.exports={
    auth, JWT_SECRET: "JWT_SECRET"
}

  