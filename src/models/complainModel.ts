import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  complainName: {
    type: String,
    required: true,
  },
  complainDescription: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

complainSchema.set("timestamps", true);

module.exports = mongoose.model("complains", complainSchema);
