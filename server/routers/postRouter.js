const router=require('express').Router();
const postController=require('../controllers/postController');
const requireUser=require('../middlewares/requireUser');

router.post('/all',requireUser, postController.getAllPosts);
router.post('/get',requireUser, postController.getPostById);
router.post('/delete',requireUser, postController.deletePostById);
router.post('/create',requireUser, postController.createPost);
router.post('/update',requireUser, postController.updatePost);
router.post('/myposts',requireUser, postController.getAllMyPosts);
router.post('/postsofuser',requireUser, postController.getAllPostByUserId);

module.exports=router

