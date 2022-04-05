const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>console.log(`Connected successfully to ${process.env.MONGO_URL}...`))
.catch(err => console.error('Connecttuon faild ...'))
