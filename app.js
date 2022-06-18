import dotenv from "dotenv"
dotenv.config()
// express
import express from "express"
import session from "express-session"
// import database
import mongoose from "mongoose"
import { connectDB } from "./db/connect.js"
// import routers
import { transactionRouter } from "./routes/transaction.js"
import { authRouter } from "./routes/auth.js"
// import middleware
import { verifyToken } from "./middlewares/verifyToken.js"
// other imports
import 'dotenv/config'
import morgan from "morgan"
import cors from "cors"
import sanitize from "mongo-sanitize"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import passport from "passport"



const app = express()

const port= 5040

//middleware
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('tiny'))

// routes
app.use('/transaction', transactionRouter)
app.use('/auth', authRouter)


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
