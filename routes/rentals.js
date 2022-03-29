const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const {Rental,validateRental} = require('../models/rentals');
const {Customer} = require('../models/customers');
const {Movie} = require('../models/movies');


router.get('/', async (req, res)=>{
    try {
        const rentals = await Rental.find({}).sort('name');
        res.status(200).send(rentals);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async(req,res)=>{
    try {
        const rentalData = req.body;
        const{error} = validateRental(rentalData);
        if(error){return res.status(400).send(error.details[0].message);}

        const customer = await Customer.findById(rentalData.customerId);
        if(!customer){return res.status(400).send('Invalid Customer')}

        const movie = await Movie.findById(rentalData.movieId);
        if(!movie){return res.status(400).send('Invalid Movie')}

        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name, 
                phone: customer.phone
              },
              movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
              }
        });
    //    new Fawn.Task()
    //    .save('rentals',rental)
    //    .update('movies', {_id:movie._id},{
    //        $inc:{numberInStock:-1}
    //    })
    //    .run();

        await rental.save();
        movie.numberInStock--;
       await movie.save();
       res.status(200).send(rental);

    } catch (error) {
        res.status(500).send('E'+error);

    }
})

module.exports = router;