import { User } from "../models/user.js";
import { hashToken } from "../utils/generateToken.js";

const verifyToken = (req, res, next) => {
    const apiToken = req.get('apiToken');
    //console.log(apiToken);
    if (apiToken){
        const hToken = hashToken(apiToken)
        //console.log(hToken)
        User.findOne({apiKey: hToken}, function (err, user) {
            //console.log(user)
            if (err) {
                res.status(404).send(err)
              }
            if (!user){
                res.status(404).json({message:'user not found'})
            }else{
                res.locals.googleId = user.googleId
                next()
            }
        })
    }else{
        res.status(404).json({message:'apiToken not provided'})
    }
}

export {verifyToken}