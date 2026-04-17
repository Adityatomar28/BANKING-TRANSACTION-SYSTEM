const express = require("express")
const authControllers = require("../controllers/auth.controllers")

const router = express.Router()


// * POST/api/auth/register
router.post("/register",authControllers.userRegisterController)

router.post("/login",authControllers.userLoginController)

/**
 * - POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController)

module.exports = router