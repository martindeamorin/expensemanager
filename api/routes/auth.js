const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")


router.post("/register", authMiddleware.registerValidation, authController.register)
router.post("/login", authMiddleware.loginValidation, authController.login)

module.exports = router