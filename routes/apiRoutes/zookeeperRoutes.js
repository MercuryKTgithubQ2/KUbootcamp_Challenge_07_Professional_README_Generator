// import customized libraries
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');

// start an instance of Router
const express = require('express')
const router = express.Router()

router.get("/api/zookeepers", (req, res) => {
   let results = zookeepers;
   if (req.query) {
     results = filterByQuery(req.query, results);
   }
   res.json(results);
 });

 router.get("/api/zookeepers/:id", (req, res) => {
   const result = findById(req.params.id, zookeepers);
   if (result) {
     res.json(result);
   } else {
     res.send(404);
   }
 });

 router.post("/api/zookeepers", (req, res) => {
   req.body.id = zookeepers.length.toString();
   if (!validateZookeeper(req.body)) {
     res.status(400).send("The zookeeper is not properly formatted.");
   } else {
     const zookeeper = createNewZookeeper(req.body, zookeepers);
     res.json(zookeeper);
   }
 });

 module.exports = router;