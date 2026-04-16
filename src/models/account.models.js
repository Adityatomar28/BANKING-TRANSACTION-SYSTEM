const mongoose = require("mongoose")
const ledgerModel = require("./ledger.model")

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
        },
        default:"ACTIVE"
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

//This is used to derive curr amount from user bank account
// it is classic arrow function not fat arrow function
accountSchema.methods.getBalance = async function(){
    // good feature of mongo Db that if u want to run custom query u can run it 
    const balanceData = await ledgerModel.aggregate([
        {$match:{account:this._id}},
        {
            //grouping diff diff attribute 
            $group:{
                _id:null,
                totalDebit:{
                    $sum:{
                        $cond:[
                            {$eg:["$type","DEBIT"]},
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit:{
                    $sum:{
                        $cond:[
                            {$eg:["$type","CREDIT"]},
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },{
            $project:{
                _id:0,
                balance:{$subtract:["$totalCredit","$totalDebit"]}
            }
        }

    ])
    // If account is new then there is no ledger entry therefore it is a bug
    if(balance.length === 0){
        return 0
    }
    return balanceData[0].balance
}


const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel