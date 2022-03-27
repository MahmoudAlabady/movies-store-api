const joi = require('joi');
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:6,
        maxLength:50
    }
});
function validateGenre(genre) {
    const schema = joi.object({
        name: joi.string().min(3).required()
    })
  
    return schema.validate(genre);
  }
  const Genre = mongoose.model('Genre',genresSchema);

module.exports = {Genre,validateGenre,genresSchema}