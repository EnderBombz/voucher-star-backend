const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_MONGO_URI;

try {
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("Successful to connect to DB!");
} catch (e) {
  console.log(e);
}

module.exports = mongoose;
