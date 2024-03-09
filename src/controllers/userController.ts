import { Request, Response } from "express";
import bcrypt from "bcrypt";

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
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error,
      });
    }
  },
};
