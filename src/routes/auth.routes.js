const express = require("express")
const authControllers = require("../controllers/auth.controllers")

const router = express.Router()


// * POST/api/auth/register
router.post("/register",authControllers.userRegisterController)

router.post("/login",authControllers.userLoginController)



module.exports = router