import { Router } from "express";

const accountController = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/createAccount/:userId", accountController.createAccount);
accountRouter.post(
  "/lockAndUnlockAccount",
  accountController.lockAndUnlockAccount
);
accountRouter.post("/deposit", accountController.deposit);
accountRouter.post("/withdraw", accountController.withdraw);
accountRouter.post("/transfer", accountController.transfer);
accountRouter.delete("/deleteAccount", accountController.deleteAccount);

module.exports = accountRouter;
