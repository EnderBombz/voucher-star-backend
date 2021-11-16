const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authentication/auth");

router.post("/", authController.auth);

module.exports = router;
