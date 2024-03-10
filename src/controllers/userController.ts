import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = require("../models/userModel");
const emailService = require("../services/emailService");

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
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
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
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },

  forgetPassword: async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.body; //? Extract Data from body
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
        //? Creating Token with JWT
        expiresIn: "1h",
      });
      const link = `https://BankProX/resetPassword/${userData._id}/${token}`;
      await emailService.mailOptions(userEmail, link);
      res.status(200).send({
        success: true,
        message: "Email has been sended",
        userId: userData._id,
        token: token,
      });
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      const { userId, token } = req.params;

      // Verify if the token is correct and not expired
      const isTokenCorrect = jwt.verify(token, "BankProX");

      if (isTokenCorrect) {
        if (newPassword === confirmPassword) {
          const userData = await userSchema.findById(userId);
          const bcryptPassword: string = await bcrypt.hash(newPassword, 10);

          // Update the user's password
          userData.userPassword = bcryptPassword;
          await userData.save();

          // Send response
          res.status(201).json({
            success: true,
            message: "Password Updated",
          });
        } else {
          res.status(401).send({
            success: false,
            message: "New password and confirm password do not match",
          });
        }
      } else {
        res.status(401).send({
          success: false,
          message: "Token is incorrect or expired",
        });
      }
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error",
        error: error.message,
      });
    }
  },
};
