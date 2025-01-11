const jwt = require('jsonwebtoken');
const User=require('../models/auth-model')

const authMiddleware=async(req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res
            .status(401)
            .json({message:"Unauthorized HTTP,token not provided"})
    }

    const jwtToken=token.replace("Bearer","").trim();

    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email:isVerified.email}).select({password:0})

        req.user=userData;
        req.token=token;
        req.user_id=userData._id;
        next();
    } catch (error) {
        console.log(error);
    }
    
}

module.exports=authMiddleware;