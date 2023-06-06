const jwt=require('jsonwebtoken');
const {error}=require("../utils/responseWrapper");
const User = require('../models/User');

//declaring constants
const accessTokenKey='WtEgzxTi8FSpCfJ3bwvBS48vSDBg8Z04kBI7rugj/YKfPzYK3uhkzGCzUbf2pg5+0GoSZH8QztFg1sWQNswvOg==';

module.exports=async(req,res,next)=>{
    try {
        try {
            const access_token=req.headers.authorization.split(' ')[1];
            const verify=jwt.verify(access_token,accessTokenKey);
            req._id=verify._id;
            const myuser=await User.findById(verify._id);
            if(!myuser){
                return res.send(error(404,'your user not find / invalid credentials'));
            }
            next();
        } catch (e) {
            return res.send(error(401,'access token is required/invalid'));
        }
    } catch (e) {
        return res.send(error(500,e.message));
    }    
}