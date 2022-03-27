const express = require('express');
const router = express.Router();
const {Customer,validateCustomer} = require('../models/customers');





//get all customers
router.get('/',async(req, res)=>{
    try {
       const customers=await Customer.find({}).sort('name');
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error)

    }
    
} );
//get one customer
router.get('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const customer = await Customer.findById(_id);
        if(!customer){
            return res.status(404).send(' customer not found');

        }
         res.status(200).send(customer);
    } catch (error) {
        res.status(500).send('ERR'+error)
    }

} )

//create customer
router.post('/',async(req, res)=>{

    try {
        const customerData = req.body;

        const {error} = validateCustomer(customerData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const customer = new Customer(customerData);
       await customer.save();
    
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );

//update customer
router.patch('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const customerData = req.body;
        const  updates = Object.keys(customerData);
        const allowedUpdates = ["name","isGold","phone"];
        var isValid = updates.every((update)=> allowedUpdates.includes(update));
        if(!isValid){
            return res.status(400).send('can\'t update');
        }
        const customer = await Customer.findById(_id);
        if(!customer){return res.status(404).send(' customer not found')};
        const {error} = validateCustomer(customerData);
        if(error) {return res.status(400).send(error.details[0].message);}
       updates.forEach((update)=>customer[update]=customerData[update]);
        // customer.name = customerData.name;
        await customer.save();
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error);

    }
   
    } )
//delete customer
router.delete('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const customer = await Customer.findByIdAndDelete(_id);      
         if(!customer){return res.status(404).send(' customer not found')};
        // const index = Genre.indexOf(gener);
        // genres.splice(index, 1);
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);

    }
    
    } )

///////////////////////
// const validateGenre = (genre)=>{
//     const schema ={
//    type:joi.string().min(3).required()
// };
// return joi.validate(genre, schema);
// // return Joi.validate(genre, schema);
// }



module.exports = router;