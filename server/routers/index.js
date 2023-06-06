const router=require('express').Router();
const authRouter=require('./authRouter');
const postRouter=require('./postRouter')
const userRouter=require('./userRouter');

router.use('/auth',authRouter);
router.use('/post',postRouter);
router.use('/user',userRouter);

module.exports=router