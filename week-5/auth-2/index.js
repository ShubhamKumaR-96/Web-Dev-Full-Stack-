const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SCERET = "JWT-SCERET";

const app = express();

app.use(express.json());

const users = [];

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
  const decodeInfo = jwt.verify(token, JWT_SCERET);

  if (decodeInfo.username) {
    req.username = decodeInfo.username;
  } else {
    res.json({
      msg: "You are not signed up",
    });
  }
  next();
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const passward = req.body.passward;

  const user = users.find(
    (u) => u.username === username && u.passward === passward
  );

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SCERET
    );

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
      user: user.username,
      password: user.password,
    });
  }
});

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
