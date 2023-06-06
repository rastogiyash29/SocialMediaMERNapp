const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {error,success}=require("../utils/responseWrapper");
const {getCookie}=require('../utils/cookieExtractor');

//declaring constants
const accessTokenKey='WtEgzxTi8FSpCfJ3bwvBS48vSDBg8Z04kBI7rugj/YKfPzYK3uhkzGCzUbf2pg5+0GoSZH8QztFg1sWQNswvOg==';
const accessTokenExpTime='4h';
const refreshTokenKey='0YgMRRFYZIv8K1ZXqJUHSAv/b2Bwap6cuwjS41g+IwONP8A74ikkOi8sIXamJEpjVhHuSowgu4bFlSU2Er04Jw==';
const refreshTokenExpTime='1d';

const signUpController=async(req,res)=>{
    try {
        //Here we will get four required details (name,username,,email,password) in request body
        const {name,username,email,password}=req.body;
        if(!name||!username||!email||!password){
            return res.send(error(400,'insufficient credentials'));
        }

        const hashedPassword=await bcrypt.hash(password,10);

        try{
            const user=await User.create({
                name,
                username,
                email,
                password:hashedPassword
            });

            const access_token=generateAccessToken({_id:user._id,name,email,username});
            const refresh_token=generateRefreshToken({_id:user._id,name,email,username});

            //adding refresh token in cookies
            res.cookie('jwt',refresh_token,{
                httpOnly:true,
                secure:true
            });

            //generate new access token and refresh token and return from here
            return res.send(success(201,{access_token})); 
        }catch(e){
            const userbyemail=await User.findOne({email});  
            if(!userbyemail){//username conflict
                return res.send(error(409,'username already taken'));
            }else{
                if(userbyemail.username===username){//both email and username conflict
                    return res.send(error(409,'both username and email are already taken'));
                }else{//only email conflict
                    return res.send(error(409,'email already taken'));
                }
            }
        }
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const loginController=async(req,res)=>{
    try {
        //Here we will get four required details (name,username,,email,password) in request body
        const {email,password}=req.body;
        if(!email||!password){
            return res.send(error(400,'insufficient credentials'));
        }

        const findUser=await User.findOne({email});
        if(!findUser){
            return res.send(error(404,'user not found'));
        }
        const matched=await bcrypt.compare(password,findUser.password);
        if(!matched){
            return res.send(error(409,'invalid password'));
        }

        const name=findUser.name;
        const username=findUser.username;
        const access_token=generateAccessToken({_id:findUser._id,name,email,username});
        const refresh_token=generateRefreshToken({_id:findUser._id,name,email,username});

        //adding refresh token in cookies
        res.cookie('jwt',refresh_token,{
            httpOnly:true,
            secure:true
        });

        //generate new access token and refresh token and return from here
        return res.send(success(200,{access_token})); 
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const refreshAccessTokenController=async(req,res)=>{
    try {
        const cookies=req.headers.cookie;
        var refresh_token=getCookie(req,'jwt');
        if(!cookies||!refresh_token){
            return res.send(error(400,'refresh token required'));
        }
        try{
            const verify=jwt.verify(refresh_token,refreshTokenKey);
            const _id=verify._id;
            const name=verify.name;
            const username=verify.username;
            const email=verify.email; 
            const access_token=generateAccessToken({_id,name,username,email});
            return res.send(success(200,{access_token}));
        }catch(e){
            return res.send(error(401,'refresh token is invalid'));
        }
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const logOutController=async(req,res)=>{
    try {
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true
        });
        return res.send(success(200,'User logout Successfully')); 
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

//Internal Functions
const generateAccessToken=(data)=>{
    try {
        const token=jwt.sign(data,accessTokenKey,{
            expiresIn:accessTokenExpTime,
        });
        return token;
    } catch (e) {
        console.log('Error in generating accessToken');
        return null;
    }
}

const generateRefreshToken=(data)=>{
    try {
        const token=jwt.sign(data,refreshTokenKey,{
            expiresIn:refreshTokenExpTime,
        });
        return token;
    } catch (e) {
        console.log('Error in generating refreshToken');
        return null;
    }
}

module.exports={
    signUpController,
    loginController,
    logOutController,
    refreshAccessTokenController
}