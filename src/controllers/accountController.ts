import { Request, Response } from "express";
import bcrypt from "bcrypt";

const accountSchema = require("../models/accountModel");
const transactionSchema = require("../models/transactionModel");

// Function to generate a random number
function generateRandomNumber(length: number): string {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  createAccount: async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.userId;
      const accountData = new accountSchema(req.body);
      const pin = generateRandomNumber(4);
      const accountNumber = generateRandomNumber(10);
      const bcryptPin: string = await bcrypt.hash(pin, 10);
      accountData.pin = bcryptPin;
      accountData.accountNumber = accountNumber;
      accountData.accountBalance = req.body.accountBalance;
      accountData.userId = userId;
      await accountData.save();
      res.status(202).json({
        success: true,
        message: "Your Account Created",
        accountDetails: {
          accountNumber: accountNumber,
          pin: pin,
          accountBalance: req.body.accountBalance,
        },
      });
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
  deleteAccount: async (req: Request, res: Response) => {
    try {
      const { accountNumber, accountPin } = req.body;
      const isAccountNumberExist = await accountSchema.findOne({
        accountNumber: accountNumber,
      });
      const isPinCorrect = await bcrypt.compare(
        accountPin.toString(),
        isAccountNumberExist.pin
      );
      if (!isAccountNumberExist) {
        return res.status(404).json({
          success: false,
          message: "Account Number Does Not Exist",
        });
      }
      if (!isPinCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid Pin",
        });
      }
      await accountSchema.deleteOne({
        accountNumber: accountNumber,
      });
      res.status(202).json({
        success: true,
        message: "Account Deleted",
      });
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },

  lockAndUnlockAccount: async (req: Request, res: Response) => {
    try {
      const { accountNumber, accountPin } = req.body;
      const isAccountNumberExist = await accountSchema.findOne({
        accountNumber: accountNumber,
      });
      const isPinCorrect = await bcrypt.compare(
        accountPin.toString(),
        isAccountNumberExist.pin
      );
      if (!isAccountNumberExist) {
        return res.status(404).json({
          success: false,
          message: "Account Number Does Not Exist",
        });
      }
      if (!isPinCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid Pin",
        });
      }
      if (isAccountNumberExist.isLocked === true) {
        isAccountNumberExist.isLocked = false;
      } else {
        isAccountNumberExist.isLocked = true;
      }
      await isAccountNumberExist.save();
      res.status(202).json({
        success: true,
        message: "Account is Edited!",
      });
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },

  deposit: async (req: Request, res: Response) => {
    try {
      const { accountNumber, accountPin, amount } = req.body;
      const accountData = await accountSchema.findOne({ accountNumber });
      if (!accountData) {
        return res.status(404).json({
          success: false,
          message: "Account Number Does Not Exist",
        });
      }
      const isPinCorrect: boolean = await bcrypt.compare(
        accountPin.toString(),
        accountData.pin
      );
      if (!isPinCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid Pin",
        });
      }
      if (accountData.isLocked) {
        return res.status(401).json({
          success: false,
          message: "Account is Locked",
        });
      }
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount cannot be negative",
        });
      }
      const newBalance = parseInt(accountData.accountBalance) + amount;
      accountData.accountBalance = newBalance;
      const transactionReport = new transactionSchema({
        accountId: accountData._id,
        transactionAmount: amount,
        transactionType: "Deposit",
      });
      await transactionReport.save();
      await accountData.save();
      res.status(201).json({
        success: true,
        message: "Amount Deposited",
        accountBalance: accountData.accountBalance,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },

  withdraw: async (req: Request, res: Response) => {
    try {
      const { accountNumber, accountPin, amount } = req.body;
      const accountData = await accountSchema.findOne({ accountNumber });
      const isPinCorrect: boolean = await bcrypt.compare(
        accountPin.toString(),
        accountData.pin
      );
      if (!isPinCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid Pin",
        });
      }
      if (accountData.isLocked) {
        return res.status(401).json({
          success: false,
          message: "Account is Locked",
        });
      }
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount cannot be negative",
        });
      }
      if (accountData.accountBalance < amount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Balance",
        });
      }
      const newBalance = parseInt(accountData.accountBalance) - amount;
      accountData.accountBalance = newBalance;
      const transactionReport = new transactionSchema({
        accountId: accountData._id,
        transactionAmount: amount,
        transactionType: "Withdraw",
      });
      await transactionReport.save();
      await accountData.save();
      res.status(201).json({
        success: true,
        message: "Amount Withdrawn",
        accountBalance: accountData.accountBalance,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
};
