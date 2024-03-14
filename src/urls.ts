import { Router } from "express";

const userRoute = require("./routes/userRoute");
const accountRoute = require("./routes/accountRoute");
const transactionRoute = require("./routes/transactionRoute");
const complainRoute = require("./routes/complainRoute");

const commonRouter = Router();

commonRouter.use("/users", userRoute);
commonRouter.use("/accounts", accountRoute);
commonRouter.use("/transactions", transactionRoute);
commonRouter.use("/complains", complainRoute);

module.exports = commonRouter;
