const joi = require('joi');
const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:3,
        maxLength:50
    },
    isGold:{
        type: Boolean,
        required: true,
         default: false
    },
    phone:{
        type: Number,
        required: true
    }

});

function validateCustomer(customer) {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        isGold: joi.boolean(),
        phone: joi.number().required()
    })
  
    return schema.validate(customer);
  }
const Customer = mongoose.model('Customer',customersSchema);

module.exports = {Customer,validateCustomer}