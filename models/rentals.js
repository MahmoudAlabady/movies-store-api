const joi = require('joi');
const mongoose = require('mongoose');


const rentalsSchema = new mongoose.Schema({

})


const Rental = mongoose.model('Rental',rentalsSchema);

module.exports ={Rental}