import { Router } from "express";

const userRoute = require("./routes/userRoutes");

const commonRouter = Router();

commonRouter.use("/users", userRoute);

module.exports = commonRouter;
