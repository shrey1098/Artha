import express from "express"
import {transactionTypeQuery} from "../utils/transactionTypeQuery.js"
import { Transaction } from "../models/transaction.js"
import { transactionAllFieldsPost,transactionByDatesQuery } from "../utils/queries.js";
import { hashToken } from "../utils/generateToken.js";

// POST a single new transaction
const postTransaction = async function (req, res, googleId){
    const transaction = new Transaction(transactionAllFieldsPost(googleId, req))
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
        var query = transactionByDatesQuery(googleId, transactionType, fromDate, toDate)
    }
    }catch(err){
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
            return res.status(400).json({message:err})
        }
        return res.send(transactionMap)
        }
    })
}

// create function to get transactions with fields amount and date

const getCurrentMonthTransaction = function (req, res, googleId, transactionType, fromDate, toDate){
    try{
        var query = transactionByDatesQuery(googleId, transactionType, fromDate, toDate)
    }catch(err){
        return res.status(400).json({message:"bad Request"})
    }
    var fields = {"amount":1, "date":1}
    Transaction.find(query, fields, function(err,transactions){
        if(err){
            res.satatus(500).json({message:err})
        }
        else{
            let transactionMap = {};
        try{transactions.forEach(function(transaction, i){
            transactionMap[i] = transaction
        })}catch(err){
            return res.status(400).json({message:err})
        }
        return res.send(transactionMap)
        }
    })
}
export {postTransaction, getTransactionsAll, getTransactionsByDates, getCurrentMonthTransaction}