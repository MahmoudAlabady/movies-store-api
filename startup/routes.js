const express =require('express');
const generRouter = require('../routes/genres');
const customerRouter = require('../routes/customers');
const moviesRouter = require('../routes/movies');
const rentalsRouter = require('../routes/rentals');
const usersRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const error = require('../middleware/error');

function routes(app) {
    app.use(express.json());

    app.use('/api/genres',generRouter);
app.use('/api/customers',customerRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/rentals',rentalsRouter);
app.use('/api/users',usersRouter);
app.use('/api/login',loginRouter);

app.use(error)
}

module.exports=routes;