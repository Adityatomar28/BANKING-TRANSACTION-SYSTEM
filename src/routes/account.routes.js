const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const createAccountController = require("../controllers/account.controllers")



const router = express.Router()

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */

router.post("/",authMiddleware.authMiddleware,createAccountController.createAccountController)


module.exports = router





