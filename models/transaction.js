import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    date: {
        type:Date,
        default:Date.now(),
    },
    timeStamp:{
        type:Date,
        default:Date.now(),
    },
    coordinates:{
        type:[Number],
        index:'2dsphere',

    },
    category:{
        main:{
            type:String,
            required:true
        },
        subCategory:{
            type:String,
            required:true,
        }
    },
    particular:{
        type:String,
        required:true
    },
    transactionType:{
        expense:{
            type:Boolean,
            required:true
        },
        income:{
            type:Boolean,
            required:true
        },
        Advance:{
            type:Boolean,
        },
        Arrear:{
            type:Boolean,
        }
    },
    amount:{
        type:Number,
        required:true,
    },
    note:{
        type:String,
        maxlength:200,
    }
})

const transactionModel = mongoose.model('transaction', transactionSchema)

export {transactionModel as Transaction}