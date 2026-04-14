const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with a user"],
        index:true //it works on the principle of B+ trees
    },
    status:{
        type:String,
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message: "Status can be either ACTIVE,FROZEN or CLOSED"
        }
    },
    currency:{
        type:String,
        required:[true,"Currency is required for creating an account"],
        default:"INR"
    },
    // in database balance is not stored directly therefore we use ledger

 
},{
    timestamp:true
})
// compound index ,Finding acc no the basis of user and status
accountSchema.index({user:1,status:1})


const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel