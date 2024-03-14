import { Request, Response } from "express";

const complainSchema = require("../models/complainModel");

module.exports = {
  addComplain: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const complainData = new complainSchema(req.body);
      complainData.userId = userId;
      await complainData.save();
      res.status(200).json({
        success: true,
        message: "Complain added successfully",
        complainData: complainData,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};
