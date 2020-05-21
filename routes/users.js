const express=require('express');
const router=express.Router();

// register user
//@route POST api/users
// @access public
router.post('/',(req,res)=>{
    res.send('register a user');
})
module.exports=router;