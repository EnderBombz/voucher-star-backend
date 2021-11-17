const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/getAll", usersController.getAll);
router.get("/getByName/:userName", usersController.getByName);
router.post("/check", usersController.check);
router.post("/register", usersController.register);
router.post("/generate-card", usersController.generateCard);
router.post("/voucher", usersController.sendVouchers);
router.post("/update-voucher", usersController.updateVouchers);

module.exports = router;
