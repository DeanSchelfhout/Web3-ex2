const express = require("express");
const AuthValidators = require("../validators/auth_validator");
const AuthController = require("../controllers/auth_controller");
const authMiddleware = require("../middlewares/auth_middleware");
const router = express.Router();

router.post("/login",AuthValidators.login,AuthController.login)

router.get("/verify",authMiddleware,AuthController.verify)

router.put("/password",authMiddleware,AuthValidators.resetPassword,AuthController.resetPassword)

router.get("/logout",AuthController.logout)

module.exports = router;
