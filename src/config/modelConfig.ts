import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/BankProX");

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected! 🚀");
});

mongoose.connection.on("error", (error: any) => {
  console.log("Mongoose connection error! 🚫");
  console.log("Mongoose Error: ", error);
});
