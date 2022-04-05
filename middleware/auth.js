const jwt = require('jsonwebtoken');


function auth(req,res,next) {
 try {
    const token = req.header('x-auth-token');
    if (!token) return req.status(401).send('Access denied. no token provided');
    
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user =  decode;

    next();
    



 } catch (error) {
    res.status(401).send("Invalid token.");
  
 }   
}


module.exports = auth;
