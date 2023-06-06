const {success, error}=require("../utils/responseWrapper");
const Post=require('../models/Post');
const User=require('../models/User');

const getAllPosts=async(req,res)=>{
    try {
        //Here we have to get UserId as _id from request
        const _id=req._id;
        const user=await User.findById(_id);

        if(!user){
            return res.send(error(404,'user not found'));
        }

        const posts=await Post.find({
            'owner':{
                '$in':user.followings
            }
        })
        return res.send(success(200,posts));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getPostById=async(req,res)=>{
    try {
        //Here we have to get postId as _id from body
        const {post_id}=req.body
        const post=await Post.findById(post_id);

        //verify whether post belongs to your following/you or not?
        const user=await User.findById(req._id);
        if(!user.posts.includes(post_id)&&!user.followings.includes(post.owner)){
            return res.send(error(403,'post doesnot belongs to your followers or you'));
        }

        return res.send(success(200,post));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const deletePostById=async(req,res)=>{
    try {
        //Here we have to get postId as _id from body
        const {post_id}=req.body
        const post=await Post.findById(post_id);
        
        //verify whether post belongs to you or not?
        const user=await User.findById(req._id);
        if(!user.posts.includes(post_id)){
            return res.send(error(403,'post doesnot belongs to you'));
        }

        const index=user.posts.indexOf(post_id);
        user.posts.splice(index,1);

        await Post.deleteOne(post);
        await user.save();

        return res.send(success(200,'Specific post is deleted '));
    } catch (e) {
        return res.send(error(500,e.message));   
    }
}
const createPost=async(req,res)=>{
    try {
        //we need 2 details in req body {caption, tags}
        const {caption,tags}=req.body;
        if(!caption||!tags){
            res.send(error(400,'required both caption and tags'));
        }
        const owner=req._id;
        const user=await User.findOne({_id:owner});
        const post=await Post.create({
            owner,
            caption,
            tags,
        });

        user.posts.push(post._id);
        await user.save();
        return res.send(success(201,post));
    } catch (e) {
        return res.send(error(500,e.message));   
    }
}
const updatePost=async(req,res)=>{
    try {
        //Here we have to get postId as _id from body
        const {post_id,caption,tags}=req.body
        const post=await Post.findById(post_id);
        if(!post){
            return res.send(error(404,'post not found'));
        }
        
        //verify whether post belongs to you or not?
        const user=await User.findById(req._id);
        if(!user.posts.includes(post_id)){
            return res.send(error(403,'post doesnot belongs to you'));
        }

        post.caption=caption?caption:post.caption;
        post.tags=tags?tags:post.tags;
        await post.save();
        
        return res.send(success(200,post));
    } catch (e) {
        return res.send(error(500,e.message));   
    }
}

const getAllMyPosts=async(req,res)=>{
    try {
        //Here we have to get UserId as _id from request
        const _id=req._id;
        const user=await User.findById(_id);

        const posts=await Post.find({
            '_id':{
                '$in':user.posts
            }
        });
        return res.send(success(200,posts));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

const getAllPostByUserId=async(req,res)=>{
    try {
        const {user_id}=req.body;
        console.log("Requestis= ",req.body);
        const user=await User.findById(user_id);

        //Here we have to get UserId as _id from request
        const _id=req._id;
        const myuser=await User.findById(_id);

        console.log("My User= ",myuser);
        console.log("User= ",user);

        if(!user||!myuser){
            return res.send(error(404,'users not found'));   
        }

        if(!myuser.followings.includes(user_id)){
            return res.send(error(403,'user is not followed by you'));
        }

        const posts=await Post.find({
            '_id':{
                '$in':user.posts
            }
        });
        return res.send(success(200,posts));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

module.exports={
    getAllPosts,
    getPostById,
    deletePostById,
    createPost,
    updatePost,
    getAllMyPosts,
    getAllPostByUserId
}