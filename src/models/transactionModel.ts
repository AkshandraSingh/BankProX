import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Types.ObjectId,
    ref: "account",
    required: true,
  },
  transactionType: {
    // ! Deposit Or WithDraw Or Transfer
    type: String,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

transactionSchema.set("timestamps", true);

module.exports = mongoose.model("transaction", transactionSchema);
