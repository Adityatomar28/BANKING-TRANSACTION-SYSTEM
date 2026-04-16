/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
 * 1. Validate request
 * 2. Validate idempotency key
 * 3. Check account status
 * 4. Derive sender balance from ledger
 * 5. Create transaction (PENDING)
 * 6. Create DEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction COMPLETED
 * 9. Commit MongoDB session
 * 10. Send email notification
 */


// Among four of them if any one of them not come req body then give error 

const transaction = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountService = require("../models/account.models")
const emailService = require("../services/email.service");
const accountModel = require("../models/account.models");
const transactionModel = require("../models/transaction.model");


async function createTransaction(req,res){


const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
        message: "FromAccount, toAccount, amount and idempotencyKey are required"
    })
}
const fromUserAccount = await accountModel.findOne({
    // checking if id exist
    _id:fromAccount,
    
})
const toUserAccount = await accountModel.findOne({
    _id:toAccount,
})
if(!fromUserAccount || !toUserAccount){
    return res.status(400).json({
        message:"Invalid from Account or toAccount"
    })
}
// 2) Validate idempotency Key
// checking that is any transaction exist with this idempotent key
const isTransactionAlreadyExists = await transactionModel.findOne({
    idempotencyKey:idempotencyKey
}) 

if(isTransactionAlreadyExists){
    
    if(isTransactionAlreadyExists.status === "COMPLETED"){
        return res.status(200).json({
            message:"Transaction already process",
            transaction:isTransactionAlreadyExists
        })
    }
    if(isTransactionAlreadyExists.status === "PENDING"){
        return res.status(200).json({
            message:"Transaction is still processing",
        })
    }
    if(isTransactionAlreadyExists.status === "FAILED"){
        return res.status(500).json({
            message:"Transaction processing failed,Please retry"
        })
    }
    if(isTransactionAlreadyExists.status === "REVERSED"){
        return res.status(500).json({
            message:"Transaction was reversed,please retry"
        })
    }
}

//3)Check account status
// checking that whether account is closed or frozen 

if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
    return res.status(400).json({
        message:"Both fromAccount and toAccount must be ACTIVE to process transaction"
    })
}
// using method made in transaction model
// Derive acc balance of from user with the help of custom method getBalance
const balance = await fromUserAccount.getBalance()

if(balance < amount){
    res.status(400).json({
        message:`Insufficient balance.Current balance is ${balance}.Requested amount is ${amount}`
    })
}

}

