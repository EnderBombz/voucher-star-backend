const mongoose = require("./../database/index");

const User = mongoose.model("user", {
  userName: String,
  outsourced: Boolean,
  area: String,
  vouchers: Array
});

module.exports = {
  User
};
