const express=require('express');
const router=express.Router();
const auth=require('../middelware/auth');
const {check,validationResult}=require('express-validator/check')
const User=require('../models/User');
const Contact=require('../models/Contact');

// get all user's contacts
//@route POST api/contacts
// @access private
router.get('/',auth,async(req,res)=>{
    try {
        const contacts=await Contact.find({user:req.user.id}).sort({date:-1});
        console.log("contacts",contacts)
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
    

})
// add new contact to user
//@route POST api/contacts
// @access private
router.post('/',[auth,[
        check('name','Name is required').not().isEmpty()

        ]
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,phone,type}=req.body;
    try {
        const newContact=new Contact({name,email,phone,type,user:req.user.id});
        const contact=await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }
   
})
// update contact for a user
//@route PUT api/contacts/:id
// @access private
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,type}=req.body;
  
    // bulild object
    const contactFields={};
    if(name) contactFields.name=name;
    if(email) contactFields.email=email;
    if(phone) contactFields.phone=phone;
    if(type) contactFields.type=type;

   try {
       let contact=await Contact.findById(req.params.id);
      
       if(!contact){
           return res.status(404).json({msg:'Contact not found'});
       }
       if(contact.user.toString()!=req.user.id){
        return res.status(401).json({msg:'Not Authorized'});
       }
       contact=await Contact.findByIdAndUpdate(req.params.id,
        {$set:contactFields},
        {new:true}
        );
        res.json(contact);
   } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
   }
})

// Delete contact for a user
//@route  api/contacts/:id
// @access private
router.delete('/:id',auth,async(req,res)=>{
    try {
        let contact=await Contact.findById(req.params.id);
        
        if(!contact){
            return res.status(404).json({msg:'Contact not found'});
        }
        if(contact.user.toString()!=req.user.id){
         return res.status(401).json({msg:'Not Authorized'});
        }
        await Contact.findByIdAndRemove(req.params.id);
         res.json("contact removed");
    } catch (err) {
         console.error(err.message);
         res.status(500).send('server error');
    }
})
module.exports=router;