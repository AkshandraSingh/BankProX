import { Router } from "express";

const userRoute = require("./routes/userRoute");
const accountRoute = require("./routes/accountRoute");

const commonRouter = Router();

commonRouter.use("/users", userRoute);
commonRouter.use("/accounts", accountRoute);

module.exports = commonRouter;
