const express=require('express');
const router=express.Router();

// get all user's contacts
//@route POST api/contacts
// @access private
router.get('/',(req,res)=>{
    res.send('All contacts of user');
})
// add new contact to user
//@route POST api/contacts
// @access private
router.post('/',(req,res)=>{
    res.send('add contact');
})
// update contact for a user
//@route PUT api/contacts/:id
// @access private
router.put('/:id',(req,res)=>{
    res.send('update contact');
})

// Delete contact for a user
//@route  api/contacts/:id
// @access private
router.delete('/:id',(req,res)=>{
    res.send('delete contact');
})
module.exports=router;