const express = require('express');
const router = express.Router();
 const Register = require('../models/users');


router.post('/',async(req, res)=>{

    try {
        const loginData = req.body;

        const {error} = validateGenre(loginData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const login = new Register(loginData);
       await login.save();
    
        // const login = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(login);
        res.status(200).send(login);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );


module.exports = router;

