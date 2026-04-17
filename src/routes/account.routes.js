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

/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user
 */
transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = transactionRoutes;

module.exports = transactionRoutes;





