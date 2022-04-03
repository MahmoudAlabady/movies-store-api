const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL_test,{useNewUrlParser:true})
.then(()=>console.log(`Connected successfully to ${process.env.MONGO_URL_test}...`))
.catch(err => console.error('Connecttuon faild ...'))
