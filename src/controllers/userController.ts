import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = require("../models/userModel");

module.exports = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const userData = new userSchema(req.body);
      const existingUserByEmail = await userSchema.findOne({
        userEmail: req.body.userEmail,
      });
      const existingUserByUsername = await userSchema.findOne({
        username: req.body.username,
      });
      if (existingUserByEmail || existingUserByUsername) {
        return res.status(400).send({
          success: false,
          message: "Email or Username already exists!",
        });
      }
      if (userData.userGender === "male" || userData.userGender === "Male") {
        userData.userProfilePic = "src/uploads/avatars/maleAvatar.jpg";
      } else {
        userData.userProfilePic = "src/uploads/avatars/femaleAvatar.jpg";
      }
      const bcryptPassword: string = await bcrypt.hash(
        req.body.userPassword,
        10
      );
      userData.userPassword = bcryptPassword;
      await userData.save();
      res.status(202).send({
        success: true,
        message: "User registered successfully!",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error,
      });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const { userEmail, userPassword } = req.body; // ? Extract Data from body
      const isEmail = await userSchema.findOne({
        userEmail: userEmail,
      });
      if (!isEmail) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials. User not found.",
        });
      }
      const userData = isEmail;
      const token: string = jwt.sign({ userData }, "BankProX", {
        // ? Creating Token with JWT
        expiresIn: "1h",
      });
      const isCorrectPassword: boolean = await bcrypt.compare(
        // ? Comparing Password
        userPassword,
        userData.userPassword
      );
      if (!isCorrectPassword) {
        return res.status(401).send({
          success: false,
          message: "Invalid credentials. Password incorrect.",
        });
      }
      res.status(200).send({
        success: true,
        message: "Authentication successful.",
        token: token,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error,
      });
    }
  },
};
