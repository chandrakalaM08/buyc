const { Router } = require("express");
var jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");

const userRouter = Router();

// this is for registering a new user
userRouter.post("/register", async (req, res) => {
  try {
    let { email, password, avatar, username } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      let hashedPassword = await bcrypt.hash(password, 5);

      let newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(200).send({ msg: "User Created Successfully", user: newUser });
      return;
    } else {
      res.status(400).send({
        msg: "User with this email already exists..Log in to continue",
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "error occured in sign up", error: error });
  }
});

// this is for logging in the user
userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .send({ msg: "User with this email doesn't exist.. Sign up first" });
    } else {
      let passwordVerify = await bcrypt.compare(password, user.password);

      if (passwordVerify) {
        let token = jwt.sign(
          {
            userEmail: email,
            userName: user.username,
            userId: user._id,
          },
          "masai",
          { expiresIn: "1h" }
        );

        res.status(200).send({ msg: "Login Successfull", token });
      } else {
        res.status(400).send({ msg: "Wrong credentials entered" });
      }
    }
  } catch (error) {
    res.status(400).send({ msg: "error occured in login", error: error });
  }
});

// this is for implementing logout functionality

module.exports = { userRouter };
