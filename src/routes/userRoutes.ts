import { Router } from "express";

const userController = require("../controllers/userController");
const { upload } = require("../middleware/userStorage");

const userRoute = Router();

userRoute.post("/registerUser", userController.registerUser);
userRoute.post("/loginUser", userController.loginUser);
userRoute.post("/forgetPassword", userController.forgetPassword);
userRoute.post("/resetPassword/:userId/:token", userController.resetPassword);
userRoute.post(
  "/addProfilePic/:userId",
  upload.single("userProfilePic"),
  userController.addProfilePic
);

module.exports = userRoute;
