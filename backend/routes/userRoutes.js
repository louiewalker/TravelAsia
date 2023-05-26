const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password,
      role
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({ 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password: hashedPassword,
      role
    });
    await newUser.save();

    newUser= newUser.toObject();
    delete newUser['password']
    const token = jwt.sign(newUser, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    delete user['password']

    const token = jwt.sign(
        user, 
        process.env.JWT_SECRET
      );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

module.exports = router;
