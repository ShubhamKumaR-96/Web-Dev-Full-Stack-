const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT-SECRET"; // Corrected typo
const app = express();

app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    msg: "You are signed up",
  });
});

// adding auth middleware
function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      // Changed: Return 401 for missing token
      msg: "Token missing",
    });
  }
  try {
    // Changed: Added try-catch for verification errors
    const decodeInfo = jwt.verify(token, JWT_SECRET);
    if (decodeInfo.username) {
      req.username = decodeInfo.username;
      next();
    } else {
      res.json({
        msg: "You are not signed up",
      });
    }
  } catch (error) {
    // Changed: Handle JWT errors
    res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );
    res.header("jwt", token);

    res.send({
      token: token,
    });
  } else {
    res.json({
      msg: "Invalid Credentials",
    });
  }
});

app.get("/me", auth, (req, res) => {
  const user = users.find((u) => u.username === req.username);

  if (!user) {
    res.json("invalid credentials");
  } else {
    res.json({
      username: user.username,
      password: user.password,
    });
  }
});

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
