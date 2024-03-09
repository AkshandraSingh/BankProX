import { Router } from "express";

const userController = require("../controllers/userController");

const userRoute = Router();

userRoute.post("/registerUser", userController.registerUser);
userRoute.post("/loginUser", userController.loginUser);

module.exports = userRoute;
