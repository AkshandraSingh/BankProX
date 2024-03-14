import { Router } from "express";

const complainController = require("../controllers/complainController");

const complainRouter = Router();

complainRouter.post("/addComplain/:userId", complainController.addComplain);

module.exports = complainRouter;
