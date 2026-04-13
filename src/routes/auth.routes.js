const express = require("express")
const authControllers = require("../controllers/auth.controllers")

const router = express.Router()


// * POST/api/auth/register
router.post("/register",authControllers.userRegisterController)
module.exports = router