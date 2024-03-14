import { Router } from "express";

const complainController = require("../controllers/complainController");

const complainRouter = Router();

complainRouter.post("/addComplain/:userId", complainController.addComplain);
complainRouter.get("/getAllComplains", complainController.getAllComplains);

module.exports = complainRouter;
