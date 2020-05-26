const express=require('express');
const router=express.Router();

const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');
const auth=require('../middelware/auth');
const config=require('config');
const {check,validationResult}=require('express-validator/check')
const User=require('../models/User');

//Get the loggedin user
//@route GET api/auth
//@access private
router.get('/',auth,async(req,res)=>{
    try {
        
        const user=await User.findById(req.user.id).select('-password');
        console.log(user);
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    res.send('get logged in use');
})
// Log in user/authenticate and get the token
//@route POST api/auth
// @access public
router.post('/',
    [
        check('email','Please include a valid email').isEmail(),
        check('password','Please enter a pass ').exists()
    ],
    async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }    
    const {email,password}=req.body;
    try{
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:'Invalid email'});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:'Invalid Pass'});
            }
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

    }
    catch{
        console.error(err.message);
        res.status(500).send('server error');
    }
    
})
module.exports=router;
module.exports=router;

