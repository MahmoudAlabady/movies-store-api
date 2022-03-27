const joi = require('joi');
const express =require('express');
const app = express();
require('./db/mongoose');

app.use(express.json());

const port = process.env.PORT || 3000;
const generRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const rentalsRouter = require('./routes/rentals');
app.use('/api/genres',generRouter);
app.use('/api/customers',customerRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/rentals',rentalsRouter);


// genres=[
//     {id: 1 , type: 'romance'},
//     {id: 2 , type: 'action'},
//     {id: 3 , type: 'drama'}
    
// ]




app.listen(port,()=>console.log(`server is running on ${port}`));



