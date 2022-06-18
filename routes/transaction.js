import express from "express"
import { Transaction } from "../models/transaction.js"
import { getTransactionsByDates, getTransactionsAll, postTransaction } from "../controllers/transaction.js"
import { verifyToken } from "../middlewares/verifyToken.js"
const router = express.Router()

//POST a transaction
router.post('/', verifyToken, (req, res)=>{
    postTransaction(req, res, res.locals.googleId)
})

router.get('/range/:transactionType', verifyToken, (req, res)=>{
  const{transactionType} = req.params
  const{fromDate, toDate} = req.query
  getTransactionsByDates(req, res, res.locals.googleId, transactionType, fromDate, toDate)
})

router.get('/all', verifyToken, (req, res)=>{
    getTransactionsAll(req, res, res.locals.googleId)
})
export{
  router as transactionRouter
}
