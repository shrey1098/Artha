import express from "express";
import passport from "passport";
import ('../controllers/auth.js')
const router = express.Router()


router.get('/google', passport.authenticate('google',
 {scope: ['openid','profile', 'email'], passReqToCallback:true})
 )

 router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res)=> {
    if(req.user['apikey']){
      res.status(200).json({'apikey': req.user['apikey']})
    }
    else{
      res.status(200).json(req.user)
    }
  });

export{
    router as authRouter
} 