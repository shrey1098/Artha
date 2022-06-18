import express from "express"
import {transactionTypeQuery} from "../utils/transactionTypeQuery.js"
import { Transaction } from "../models/transaction.js"
import { hashToken } from "../utils/generateToken.js";

// POST a single new transaction
const postTransaction = async function (req, res, googleId){
    const transaction = new Transaction({
        googleId: googleId,
        date: new Date(req.body.date),
        coordinates:req.body.coordinates,
        category:{
            main:req.body.category.main,
            subCategory:req.body.category.subCategory,
        },
        particular:req.body.particular,
        transactionType:{
            expense:req.body.transactionType.expense,
            income:req.body.transactionType.income
        },
        amount:req.body.amount,
        note:req.body.note,
    })
    try{
        const savedTransaction = await transaction.save();
        res.json(savedTransaction)
    }catch(err){
        res.json({message:err})
    }
}

const getTransactionsAll = function (req, res, googleId){
    //console.log(googleId)
    var fields = {'particular':1, "amount":1, "category":{"main":1},
    "transactionType":{"expense":1}}
    Transaction.find({googleId: googleId},fields,
        function (err, transactions){
        if(err){
            res.json({message:err})
        }else{
        let transactionMap = {};
        try{transactions.forEach(function(transaction, i){
            transactionMap[i] = transaction
        })}catch(err){
            console.log(err)
        }
        return res.send(transactionMap)}
    })
}

const getTransactionsByDates = function (req, res, googleId, transactionType, fromDate, toDate){
    try{ 
        if(fromDate>toDate){
            return res.status(400).json({message:"bad Request"})
        }
        else{
        var query = {
        googleId: googleId,
        date: {
            $gte: new Date(fromDate).toISOString(),
            $lte: new Date(toDate).toISOString(),
        },
        transactionType: transactionTypeQuery(transactionType)
    }
    }}catch(err){
        return res.status(400).json({message:"bad Request"})
    }
    var fields = {'particular':1, "amount":1,
     "category":{"main":1, "subCategory":1}, "note":1, "date":1,}
    Transaction.find(query, fields, function(err,transactions){
        if(err){
            res.satatus(500).json({message:err})
        }
        else{
            let transactionMap = {};
        try{transactions.forEach(function(transaction, i){
            transactionMap[i] = transaction
        })}catch(err){
            console.log(err)
        }
        return res.send(transactionMap)
        }
    })
}


export {postTransaction, getTransactionsAll, getTransactionsByDates}