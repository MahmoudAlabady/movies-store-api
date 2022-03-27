const joi = require('joi');
const mongoose = require('mongoose');
const genresSchema = require('./genres').genresSchema;

const moviesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:255
    },
    genre:{
        type: genresSchema,
        required:true,
    },
    numberInStock:{
        type:Number,
        required: true,
        min:0,
        default:0
    },
    dailyRentalRate:{
        type:Number,
        required: true,
        min:0,
        default:0
    }

});
function validateMovie(movie) {
    const schema = joi.object({
        title: joi.string().min(3).required(),
        genreId:joi.string().required()
        // {
        //     name:joi.string()
        // }
        ,
        numberInStock:joi.number(),
        dailyRentalRate:joi.number()
    })
  
    return schema.validate(movie);
  }
  const Movie = mongoose.model('Movie',moviesSchema);

module.exports = {Movie,validateMovie}