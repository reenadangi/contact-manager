const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const router=express.Router();
const {check,validationResult}=require('express-validator/check')
const User=require('../models/User');


// register user
//@route POST api/users
// @access public
// express validators 
router.post('/',
    [
        check('name','Please add name').not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password','Please enter a pass with 6 char').isLength({
            min:6
        })
    ],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {name,email,password}=req.body;
        console.log("sdsfdsfd");
        try{
        // if user already exist
        let user= await User.findOne({email:email});
        if(user){
            return res.status(400).json({msg:'User Already exist'});
        }
            user=new User({
                name,email,password

            });
            // bcrupt pass
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(password,salt);
            await user.save();
            // respond with json web token so that user can login
            const payLoad={
                user:{
                   id:user.id

                }
            }
            jwt.sign(payLoad,config.get('jwtSecret'),{
                expiresIn:360000
            },(err,token)=>{
                if(err) throw err;
                res.json({token});
            })
        
    }catch (err){
            console.error(err.message);
            res.status(500).send('server error');
    }
})
module.exports=router;