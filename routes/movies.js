const express = require('express');
const router = express.Router();
const {Movie,validateMovie} = require('../models/movies');
const {Genre} = require('../models/genres');





//get all movies
router.get('/',async(req, res)=>{
    try {
       const movies=await Movie.find({}).sort('title');
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error)

    }
    
} );
//get one movie
router.get('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const movie = await Movie.findById(_id);
        if(!movie){
            return res.status(404).send(' movie not found');

        }
         res.status(200).send(movie);
    } catch (error) {
        res.status(500).send('ERR'+error)
    }

} )

//create movie
router.post('/',async(req, res)=>{

    try {
        // const genre = await Genre.findById
        const movieData = req.body
        // {
        //     title:req.body.title,
        //     genre:{
        //         _id:genre._id,
        //         name:genre.name
        //     },
        //     numberInStock:req.body.numberInStock,
        //     dailyRentalRate:req.body.dailyRentalRate
        // };
        const {error} = validateMovie(movieData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const genre = await Genre.findById(movieData.genreId);
       if (!genre){return res.status(400).send('Invalid Genre')}
        const movie = new Movie({
            title:req.body.title,
            genre:{
                _id:genre._id,
                name:genre.name
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        });
       await movie.save();
    
        // const gener = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(gener);
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );

//update movie
router.patch('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const movieData = req.body;

        const genre = await Genre.findById(movieData.genreId);
        if (!genre){return res.status(400).send('Invalid Genre')}
        const  updates = Object.keys(movieData);
        const allowedUpdates = ["title","numberInStock","dailyRentalRate","genreId"];
        var isValid = updates.every((update)=> allowedUpdates.includes(update));
        if(!isValid){
            return res.status(400).send('can\'t update');
        }
        const movie = await Movie.findById(_id);
        if(!movie){return res.status(404).send(' movie not found')};
        const {error} = validateMovie(movieData);
        if(error) {return res.status(400).send(error.details[0].message);}
       updates.forEach((update)=>movie[update]=movieData[update]);
        // movie.name = movieData.name;
        await movie.save();
        res.status(200).send(movie);
    } catch (error) {
        res.status(400).send(error);

    }
   
    } )
//delete movie
router.delete('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const movie = await Movie.findByIdAndDelete(_id);      
         if(!movie){return res.status(404).send(' movie not found')};
        // const index = Genre.indexOf(movie);
        // genres.splice(index, 1);
        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error);

    }
    
    } )

///////////////////////
// const validateGenre = (genre)=>{
//     const schema ={
//    type:joi.string().min(3).required()
// };
// return joi.validate(genre, schema);
// // return Joi.validate(genre, schema);
// }



module.exports = router;