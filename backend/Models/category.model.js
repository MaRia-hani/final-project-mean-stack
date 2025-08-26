const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true , enum:["Body","Face" ,"Hair"], unique: true},
});
module.exports = mongoose.model("category", categorySchema);

