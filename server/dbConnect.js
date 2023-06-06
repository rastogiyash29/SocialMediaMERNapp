const mongoose=require('mongoose');

module.exports=async()=>{
    const mongoUri='mongodb+srv://yashrastogi2904:y7DewgudxtLR9jpD@cluster0.cog5gb2.mongodb.net/?retryWrites=true&w=majority';
    try{
        const connect=await mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("mongoDB connected ",connect.connection.host);
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}