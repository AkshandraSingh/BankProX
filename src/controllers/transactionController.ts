import { Request, Response } from "express";

const transactionSchema = require("../models/transactionModel");

module.exports = {
  viewAllTransaction: async (req: Request, res: Response) => {
    try {
      const { accountId } = req.params;
      const transactionData = await transactionSchema.find({
        accountId: accountId,
      });
      res.status(200).json({
        success: true,
        message: "All transactions fetched successfully",
        data: transactionData,
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
