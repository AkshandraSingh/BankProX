import { Router } from "express";

const accountController = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/createAccount/:userId", accountController.createAccount);
accountRouter.delete("/deleteAccount", accountController.deleteAccount);

module.exports = accountRouter;
