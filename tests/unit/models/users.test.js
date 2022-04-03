const {User} = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('User.generateToken',()=>{
 it('should return a token',()=>{
   const payload = 
   {_id: new mongoose.Types.ObjectId().toHexString(),isAdmin:true  }
   const user = new User(payload);
   const token = user.generateToken();
   const decoded = jwt.verify(token,process.env.JWT_SECRET);

   expect(decoded).toMatchObject(payload);
 });

})