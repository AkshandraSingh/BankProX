import { Request, Response } from "express";
import bcrypt from "bcrypt";

const accountSchema = require("../models/accountModel");

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

export const createAccount = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const accountData = new accountSchema(req.body);
    const pin = generateRandomNumber(4);
    const accountNumber = generateRandomNumber(10);
    const bcryptPin: string = await bcrypt.hash(pin, 10);
    const bcryptAccountNumber: string = await bcrypt.hash(accountNumber, 10);
    const bcryptAccountBalance: string = await bcrypt.hash(
      req.body.accountBalance.toString(),
      10
    );
    accountData.accountNumber = bcryptAccountNumber;
    accountData.pin = bcryptPin;
    accountData.accountBalance = bcryptAccountBalance;
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
};
