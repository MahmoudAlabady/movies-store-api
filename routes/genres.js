const express = require('express');
const router = express.Router();
const {Genre,validateGenre} = require('../models/genres');





//get all geners
router.get('/',async(req, res)=>{
    try {
       const genres=await Genre.find({}).sort('name');
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send(error)

    }
    
} );
//get one gener
router.get('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const gener = await Genre.findById(_id);
        if(!gener){
            return res.status(404).send(' genere not found');

        }
         res.status(200).send(gener);
    } catch (error) {
        res.status(500).send('ERR'+error)
    }

} )

//create gener
router.post('/',async(req, res)=>{

    try {
        const generData = req.body;

        const {error} = validateGenre(generData);
        if(error) {return res.status(400).send(error.details[0].message);}
       const gener = new Genre(generData);
       await gener.save();
    
        // const gener = {
        //     id: genres.length + 1,
        //     type: req.body.type
        // };
        // genres.push(gener);
        res.status(200).send(gener);
    } catch (error) {
        res.status(400).send('e'+error)
    }
   
} );

//update gener
router.patch('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const generData = req.body;
        const gener = await Genre.findById(_id);
        if(!gener){return res.status(404).send(' genere not found')};
        const {error} = validateGenre(generData);
        if(error) {return res.status(400).send(error.details[0].message);}
        gener.name = generData.name;
        await gener.save();
        res.status(200).send(gener);
    } catch (error) {
        res.status(400).send(error);

    }
   
    } )
//delete gener
router.delete('/:id',async(req, res)=>{
    try {
        const _id = req.params.id;
        const gener = await Genre.findByIdAndDelete(_id);      
         if(!gener){return res.status(404).send(' genere not found')};
        // const index = Genre.indexOf(gener);
        // genres.splice(index, 1);
        res.status(200).send(gener);
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