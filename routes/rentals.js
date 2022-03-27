const express = require('express');
const router = express.Router();
const {Rental} = require('./rentals')
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
        const rental = new Rental({

        });
       await rental.save();
       res.status(200).send(rental);

    } catch (error) {
        res.status(500).send(error);

    }
})

module.exports = router;