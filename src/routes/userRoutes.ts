import { Router } from "express";

const userController = require("../controllers/userController");

const userRoute = Router();

userRoute.post("/registerUser", userController.registerUser);
userRoute.post("/loginUser", userController.loginUser);
userRoute.post("/forgetPassword", userController.forgetPassword);
userRoute.post("/resetPassword/:userId/:token", userController.resetPassword);

module.exports = userRoute;
