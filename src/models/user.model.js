const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowercase:true,
        //It will check for email is in correct format or not therefore we will use regex
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
        unique:[true,"Email already exist"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an account"]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minlength:[6,"Password should be contain more than 6 character"],
        select:false //password by defalult kise bh query m ni aayega
    }
 
},{
    timestamps:true
})
//Before saving info about user this function going to run
// in this we are checking if user password is changed then we are going to hash the password
//Therefore use case of pre is that whatever the. password is it converts them into hash and save them in database
//pre is a middleware
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return
    }
    //password is converted into hash then this hash is saved as a password
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash //copying in password in saved in database

    return

})

//Now this Method is comparing the hash saved in database with the password
//The rule of bcrypt is user password is wrong then it returns false else true therefore this method return true or false
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model("user",userSchema)

module.exports = userModel