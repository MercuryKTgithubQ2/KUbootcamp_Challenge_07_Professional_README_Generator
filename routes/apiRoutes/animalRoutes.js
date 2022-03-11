// import customized libraries
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// start an instance of Router
const express = require('express')
const router = express.Router()
// const router = require('express').Router();

router.use(express.static('public')); //this works

 // parameter-1: a string that describes the route the client will have to fetch from
 // parameter-2: callback function that will execute every time that route is accessed with a GET request
 router.get('/api/animals/:id', (req, res) => {
   const result = findById(req.params.id, animals);
   if (result) {
     res.json(result);
   } else {
     res.send(404);
   }
 });
 
 router.get('/api/animals', (req, res) => { 
   // res.json(animals); 
   //res parameter (short for response) to send the string Hello! to our client.
     let results = animals;
     console.log('-----------------')  
     console.log(req.query) // print { name: 'Erica' }
     console.log("`````````````````")  
     if (req.query) {
       results = filterByQuery(req.query, results);
     }
     res.json(results); // send the result to the browser
     // console.log(results); // print the json data
 });

 router.post('/api/animals', (req, res) => {

   // set id based on what the next index of the array will be
   req.body.id = animals.length.toString();

   // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    const animal = createNewAnimal(req.body, animals); // this function main goal is to write to file with new animal json obj
    res.json(animal);  // res.json(req.body); // we could just respond with req.body here
  }

 });

 module.exports = router;  //export object router