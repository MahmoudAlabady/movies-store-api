const joi = require('joi');
const jwt = require('jsonwebtoken');
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
},
isAdmin:{
  type:Boolean,
  default:false,
}
})
userSchema.methods.generateToken = function(){
  const token =  jwt.sign({_id: this._id, isAdmin:this.isAdmin},process.env.JWT_SECRET);
  return token;
}

function validateUser(user) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        isAdmin:joi.boolean()
    })
  
    return schema.validate(user);
  }

  function validatelogin(userLogin) {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
  
    return schema.validate(userLogin);
  }  

const User = mongoose.model('User',userSchema)

module.exports ={User,validateUser,validatelogin};