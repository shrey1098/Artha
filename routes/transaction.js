import express from "express"
import { Transaction } from "../models/transaction.js"
import { getCurrentMonthTransaction, getTransactionsByDates, getTransactionsAll, postTransaction } from "../controllers/transaction.js"
import { verifyToken } from "../middlewares/verifyToken.js"
import { monthRange } from "../utils/fetchMonthRange.js"
const router = express.Router()

//POST a transaction
router.post('/', verifyToken, (req, res)=>{
    postTransaction(req, res, res.locals.googleId)
})

//get transactions by range
router.get('/range/:transactionType', verifyToken, (req, res)=>{
  const{transactionType} = req.params
  const{fromDate, toDate} = req.query
  getTransactionsByDates(req, res, res.locals.googleId, transactionType, fromDate, toDate)
})

// get for current month transactions amounts and date
router.get('/monthly/:transactionType', verifyToken, (req, res)=>{
  const{transactionType} = req.params
    var mRange = monthRange(
        new Date().getMonth(),
        new Date().getFullYear())
    getCurrentMonthTransaction(req, res, res.locals.googleId, transactionType, mRange[0], mRange[1],)
})

//get all transactions of a user
router.get('/all', verifyToken, (req, res)=>{
    getTransactionsAll(req, res, res.locals.googleId)
})

export{
  router as transactionRouter
}
