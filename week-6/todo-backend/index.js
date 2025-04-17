const express = require("express");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT_SECRET";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo-app");

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  await UserModel.create({
    name: name,
    email: email,
    password: password,
  });
  res.json({
    msg: "You are Logged In",
  });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(user);
  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "Incorrect Credentials",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;

  const users = await TodoModel.create({
    title,
    userId
  });

  res.json({
    users
  });
});

app.get("/todos", auth, async(req, res) => {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId:userId
  });
  res.json({
    todos,
  });
});

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

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
