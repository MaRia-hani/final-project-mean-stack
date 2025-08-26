const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ASU:HM4Gbf0cDqFhCJLq@cluster0.kjrnlr3.mongodb.net/e-comm?retryWrites=true&w=majority&appName=Cluster0");
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
