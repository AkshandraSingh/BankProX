import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountBalance: {
    type: Number,
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
