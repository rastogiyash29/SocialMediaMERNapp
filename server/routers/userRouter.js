const router=require('express').Router();
const userController=require('../controllers/userController');
const requireUser=require('../middlewares/requireUser');

router.post('/follow',requireUser,userController.followUnfollowUser);
router.post('/get',requireUser,userController.getUserById);
router.post('/myfollowers',requireUser,userController.getAllMyFollowers);
router.post('/myfollowings',requireUser,userController.getAllMyFollowings);
router.post('/find',requireUser,userController.getUsersByUserName);
router.post('/getmyuser',requireUser,userController.getMyUser);

module.exports=router

