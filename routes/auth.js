const express=require('express');
const router=express.Router();

//Get the loggedin user
//@route GET api/auth
//@access private
router.get('/',(req,res)=>{
    res.send('get logged in use');
})
// Log in user/authenticate and get the token
//@route POST api/auth
// @access public
router.post('/',(req,res)=>{
    res.send('Authenticate user');
})
module.exports=router;
module.exports=router;

