const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

/**
 * 
 * user register controller 
 * POST/api/auth/register
*/


async function userRegisterController(req,res){
    const {email,password,name} = req.body

    const isUserExist = await userModel.findOne({
        email:email
    })
    if(isUserExist){
        return res.status(400).json({
            success:false,
            message:"User already exist with this email",
            status:"failed"
        })
    }
    //user is not exist then we are going to create a new user
    const user = await userModel.create({
        email,
        password,
        name
    })
    //After creating user we are going to generate a token for user
    //it contains payload and pvt key
    
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("token",token)
    //Now we have to set the token into cookie so that we can use this token for authentication and authorization
    return res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })

   
  
}
user 
module.exports = {
    userRegisterController
}
