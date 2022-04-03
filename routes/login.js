const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

 const {User,validatelogin} = require('../models/users');


router.post('/',async(req, res)=>{

    try {
        const loginData = req.body;

        const {error} = validatelogin(loginData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const login = new User(loginData);
       const user = await User.findOne({email:loginData.email});
       if(!user){return res.status(400).send('Invalid User')};
       
       const validPassword = await bcrypt.compare(loginData.password,user.password);
       if(!validPassword){return res.status(400).send('Invalid User')};
       
       const token = user.generateToken();       
    //    await login.save();
    
        // const login = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(login);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );


module.exports = router;

