const User=require('../models/User');
const {error,success}=require("../utils/responseWrapper");

const getUserById=async(req,res)=>{
    try {
        //It will accept one user_id from req.body
        console.log(req.body);
        const {user_id}=req.body;
        const _id=req._id;

        const user=await User.findById(user_id);
        if(!user){
            res.send(error(404,'user not found'));
        }
        
        return res.send(success(200,user));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}
const followUnfollowUser=async(req,res)=>{
    try {
        const {user_id}=req.body;
        const _id=req._id;

        const user=await User.findById(user_id);
        const myuser=await User.findById(_id);

        if(!user||!myuser||user_id==_id){
            return res.send(error(404,'user not found'));
        }

        var resultString;
        if(myuser.followings.includes(user_id)){    //user already followed
            const ind=myuser.followings.indexOf(user_id);
            myuser.followings.splice(ind,1);

            const index=user.followers.indexOf(_id);
            user.followers.splice(index,1);

            resultString='user unfollowed';
        }else{      //user not followed
            user.followers.push(_id);
            myuser.followings.push(user_id);
            resultString='user followed';
        }

        await user.save();
        await myuser.save();

        return res.send(success(200,resultString));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getMyUser=async(req,res)=>{
    try {
        const _id=req._id;

        const myuser=await User.findById(_id);

        if(!myuser){
            return res.send(error(404,'user not found'));
        }

        return res.send(success(200,myuser));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getAllMyFollowers=async(req,res)=>{
    try {
        const _id=req._id;
        const myuser=await User.findById(_id);
        
        if(!myuser){
            res.send(error(404,'user not found'));
        }

        const users=await User.find({
            '_id':{
                '$in':myuser.followers
            }
        });

        return res.send(success(200,users));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getAllMyFollowings=async(req,res)=>{
    try {
        const _id=req._id;
        const myuser=await User.findById(_id);
        
        if(!myuser){
            res.send(error(404,'user not found'));
        }

        const users=await User.find({
            '_id':{
                '$in':myuser.followings
            }
        });

        return res.send(success(200,users));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getUsersByUserName=async(req,res)=>{
    try{
        const {usernamequery}=req.body;
        if(!usernamequery){
            return res.send(error(404,'username query not found'));
        }
        var regExp = new RegExp(usernamequery,"gi");
        const users=await User.find({
            username: { $regex: regExp }
        });
        return res.send(success(200,users));
    }catch(e){
        return res.send(error(500,e.message));
    }
}

module.exports={
    getUserById,
    followUnfollowUser,
    getAllMyFollowers,
    getAllMyFollowings,
    getUsersByUserName,
    getMyUser
}