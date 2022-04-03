// const joi = require('joi');
const express =require('express');
const app = express();
require('./startup/routes')(app);

require("dotenv").config();


require('./db/mongoose');


const port = process.env.PORT;





const server = app.listen(port,()=>console.log(`server is running on ${port}`));

module.exports = server;

