const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/users');



router.get('/profile',auth,async (req, res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password');
         res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});


// create User
router.post('/',async(req, res)=>{

    try {
        const userData = req.body;

        const {error} = validateUser(userData);
        if(error) {return res.status(400).send(error.details[0].message);}
        let user = await User.findOne({email: userData.email});
        if(user){return res.status(400).send('User already registered')} 
        user = new User(userData);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
         
        await user.save();
    
        // const User = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(User);
        const token = user.generateToken();       

        res.status(200).header('x-auth-token', token).send(_.pick(user,['name','email','_id','isAdmin']));
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );
////////////////////////////

// create User version1
// router.post('/',async(req, res)=>{

//     try {
//         const userData = req.body;

//         const {error} = validateUser(userData);
//         if(error) {return res.status(400).send(error.details[0].message);}
//         let user = await User.findOne({email: userData.email});
//         if(user){return res.status(400).send('User already registered')} 
        
//         user = new User(userData);
//         await user.save();
    
//         // const User = {
//         //     id: genres.length + 1,
//         //     type: req.body.type
//         // };
//         // genres.push(User);
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(400).send('e'+error)
//     }
   
// } );




module.exports = router;

