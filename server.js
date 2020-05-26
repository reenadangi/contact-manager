const express=require('express');
const connectDB=require('./config/db');

const app=express();

// connect MongoDB
connectDB();
// middleware
app.use(express.json({extented:false}));
app.get('/',(req,res)=>res.json({msg:'Contact Keeper'}));

// define routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

const PORT=process.env.PORT||5000
app.listen(PORT,()=>console.log(`server started at ${PORT}`))