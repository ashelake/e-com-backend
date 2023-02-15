const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://ashelake:325411@cluster0.zshh9qv.mongodb.net/?retryWrites=true&w=majority"
);
module.exports = connection;
