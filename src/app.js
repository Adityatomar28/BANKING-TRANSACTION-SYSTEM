const express = require('express');
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
 

const app = express() 
//This is a middleware which is used to parse the incoming request body in JSON format and make it available in req.body
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)


module.exports = app;