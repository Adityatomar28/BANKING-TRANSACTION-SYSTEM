const express = require('express');
const cookieParser = require("cookie-parser")
const transactionRoutes = require("./routes/transaction.routes")

const app = express() 
//This is a middleware which is used to parse the incoming request body in JSON format and make it available in req.body
app.use(express.json())
app.use(cookieParser())

// ROUTES REQUIRED

const authRouter = require("./routes/auth.routes")
const accountRouter = require("../src/routes/account.routes")

// Use Routes
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transaction",transactionRoutes)


module.exports = app;