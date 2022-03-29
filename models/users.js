const joi = require('joi');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      min:3,
      max:100,

  },
  email: {
      type: String,
      required:true,
      unique:true,
      lowercase:true,
  },
  password:{
    type:String,
    required:true,
    tirm:true,
    minLength:6
}
})


function validateUser(user) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    })
  
    return schema.validate(user);
  }

const User = mongoose.model('User',userSchema)

module.exports ={User,validateUser};