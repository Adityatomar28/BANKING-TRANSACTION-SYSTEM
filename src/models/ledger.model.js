const mongoose = require("mongoose");

// ledger model ham saari entries likhte hai 
const ledgerSchema = new mongoose.Schema(
{
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Ledger must be associated with an account"],
        index: true,
        // once created, cannot be modified
        immutable: true,
    },

    amount: {
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    //kis transaction ki ledger entries hai
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },

    type: {
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT"
        },
        required: [true, "Ledger type is required"],
        immutable: true
    }
},
{
    timestamps: true   // optional but recommended
}
);

//we never modify the ledger entries therefore to prevent it 
function preventLedgerModified(){
    throw new Error("Ledger entries are immutable and cannot be modified or deleted");
}

ledgerSchema.pre('findOneAndUpdate',preventLedgerModified)
ledgerSchema.pre('updateOne',preventLedgerModified)
ledgerSchema.pre('deleteOne',preventLedgerModified)
ledgerSchema.pre('remove',preventLedgerModified)
ledgerSchema.pre('deleteMany',preventLedgerModified)
ledgerSchema.pre('findOneAndDelete',preventLedgerModified)
ledgerSchema.pre('findOneAndReplace',preventLedgerModified)


const ledgerModel = mongoose.model('ledger',ledgerSchema);

module.exports = ledgerModel;