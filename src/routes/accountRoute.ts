import { Router } from "express";

const accountController = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.post("/createAccount/:userId", accountController.createAccount);

module.exports = accountRouter;
