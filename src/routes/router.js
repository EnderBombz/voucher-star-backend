const express = require("express");
const router = express.Router();

const auth = require("./authentication/auth");
const authMiddleware = require("../middleware/auth");
const users = require("./users");

router.use("/api/auth", auth);
//router.use(authMiddleware);
router.use("/users", users);

module.exports = router;
