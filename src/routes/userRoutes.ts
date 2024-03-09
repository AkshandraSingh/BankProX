import { Router } from "express";

const userController = require("../controllers/userController");

const userRoute = Router();

userRoute.post("/registerUser", userController.registerUser);

module.exports = userRoute;
