const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const { auth, JWT_SECRET } = require("./auth");
const { z } = require("zod");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo-app");

app.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      msg: "Incorrect Format",
      err: parsedDataWithSuccess.flatten(),
    });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    res.json({
      msg: "You are Logged In",
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(30),
  });
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      msg: "Incorrect format",
      error: parsedDataWithSuccess.error.flatten(),
    });
  }
  const { email, password } = req.body;
  try {
    // Changed: Added try-catch for error handling
    const user = await UserModel.findOne({
      email: email.toLowerCase(), // Changed: Query with lowercase email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Changed: Use bcrypt.compare to verify password
      const token = jwt.sign(
        {
          id: user._id.toString(), // Changed: Use 'sub' claim for user ID
        },
        JWT_SECRET,
        { expiresIn: "1h" } // Changed: Added token expiration
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({
        msg: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const requiredBody = z.object({
    title: z.string().min(1).max(200),
  });
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      msg: "Incorrect format",
      error: parsedDataWithSuccess.error.flatten(),
    });
  }

  const userId = req.userId;
  const { title } = req.body;

  try {
    const todo = await TodoModel.create({
      title,
      userId,
    });

    res.json({
      todo,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await TodoModel.find({ userId }).select("title"); 
    res.json({
      todos,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

app.listen(4001, () => {
  console.log("Server running on http://localhost:4001");
});
