const mongoose = require("./../database/index");

const User = mongoose.model("user", {
  userName: String,
  outsourced: Boolean
});

module.exports = {
  User
};
