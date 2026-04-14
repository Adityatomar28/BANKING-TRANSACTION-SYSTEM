const accountModel = require("../models/account.models");
const account = require("../models/account.models");

// Use of this controllers is that 
// A account will be created with user id then in response we send the account
async function createAccountControllers(req,res){
    const user = req.user;

    const account = await accountModel.create({
        user:user._id
    })
    res.status(201).json({
        account
    })


}

module.export = {
    createAccountControllers
}