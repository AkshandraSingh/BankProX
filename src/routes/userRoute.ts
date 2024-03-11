import { Router } from "express";

const userController = require("../controllers/userController");
const { upload } = require("../middleware/userStorage");

const userRouter = Router();

userRouter.post("/registerUser", userController.registerUser);
userRouter.post("/loginUser", userController.loginUser);
userRouter.post("/forgetPassword", userController.forgetPassword);
userRouter.post("/resetPassword/:userId/:token", userController.resetPassword);
userRouter.post(
  "/addProfilePic/:userId",
  upload.single("userProfilePic"),
  userController.addProfilePic
);
userRouter.post("/setNewPassword/:userId", userController.setNewPassword);
userRouter.delete("/deleteAccount/:userId", userController.deleteAccount);

module.exports = userRouter;
