const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/vidly-api',{useNewUrlParser:true})
.then(()=>console.log('Connected successfully...'))
.catch(err => console.error('Connecttuon faild ...'))
