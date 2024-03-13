import { Router } from "express";

const transactionController = require("../controllers/transactionController");

const transactionRouter = Router();

transactionRouter.get(
  "/viewAllTransaction/:accountId",
  transactionController.viewAllTransaction
);
transactionRouter.get(
  "/viewTodayTransactions/:accountId",
  transactionController.viewTodayTransactions
);

module.exports = transactionRouter;
