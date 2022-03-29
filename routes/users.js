const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/users');

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
        
        res.status(200).send(_.pick(user,['name','email','_id']));
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );
////////////////////////////

// create User version1
router.post('/',async(req, res)=>{

    try {
        const userData = req.body;

        const {error} = validateUser(userData);
        if(error) {return res.status(400).send(error.details[0].message);}
        let user = await User.findOne({email: userData.email});
        if(user){return res.status(400).send('User already registered')} 
        
        user = new User(userData);
        await user.save();
    
        // const User = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(User);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );




module.exports = router;

