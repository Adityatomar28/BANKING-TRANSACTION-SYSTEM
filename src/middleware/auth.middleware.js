const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")



async function authMiddleware(req,res,next) {
    // we have checked that the token is not present in both of them then definetly user is not logged in
    const token = req.cookies.token || req.header.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing"
        })
    }
    try {
        //verify user
        //In auth.controllers.js. m the token we have used names userId same token going to be saved in decoded 
        //decoded k andr user ki id aayegi then user ki id k basis p ham user ko find karenge hamare database s 
        //then uske data ko save krdenge user variable k andr
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)

        req.user = user

        return next() //forwarded towards controllers
        
    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized access,token is invalid"
        })
    }
} 

module.exports = {
    authMiddleware
}