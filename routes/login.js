const express = require('express');
const router = express.Router();
// const Register = require('../models/register');


router.post('/',async(req, res)=>{

    try {
        const registerData = req.body;

        const {error} = validateGenre(registerData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const register = new Register(registerData);
       await register.save();
    
        // const register = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(register);
        res.status(200).send(register);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );


module.exports = router;

