const express=require('express');
const morgan = require('morgan');
const cors=require('cors');
const indexRouter=require('./routers/index');
const app=express();
const dbConnect=require('./dbConnect');
dbConnect();

//middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(cors({
    credentials:true,
    origin:[
        'http://localhost:3000',
        'https://social-media-mer-napp.vercel.app',
        'https://social-media-quotify.onrender.com',
        'https://social-media-quotify.netlify.app'
    ]
}));
app.use('/',indexRouter);

const PORT=process.env.PORT||4001;
app.listen(PORT,()=>{
    console.log("listening on port ", PORT);
});