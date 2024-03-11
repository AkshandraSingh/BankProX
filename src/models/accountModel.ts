import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: String,
    default: 0,
  },
  pin: {
    type: String,
    required: true,
  },
  lock: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

accountSchema.set("timestamps", true);

module.exports = mongoose.model("account", accountSchema);
