const express = require('express');
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes'); // will read the index.js files in each of the directories indicated
const htmlRoutes = require('./routes/htmlRoutes'); // the index.js file will be the default file read if no other file is provided

const { animals } = require('./data/animals.json');
 
// const PORT = 3001;
const MYPORT = process.env.PORT || 3003;
// To instantiate the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// app.use('/api', apiRoutes);
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

// app.use(express.static('public')); //no longer work

// function createNewAnimal(body, animalsArray) {
//   const animal = body;
//   animalsArray.push(animal);
//   fs.writeFileSync(
//     path.join(__dirname, './data/animals.json'),
//     JSON.stringify({animals : animalsArray }, null, 2)
//   );
//   return animal;
//  
//   // return body;
// }

// // function createNewAnimal(body) {
// //   const animal = body;
// //   animals.push(animal);
// //   
// //   fs.writeFileSync(
// //     path.join(__dirname, './data/animals.json'),
// //     JSON.stringify({ animals }, null, 2)
// //   );
// // 
// //   return animal;
// //  
// //   // return finished code to post route for response
// //   // return body;
// // }

// need to use listen() method onto our server to make our server listen

app.listen(MYPORT, () => {
  console.log(`API server now on port ${MYPORT}`);
  console.log(`Example app listening at http://localhost:${MYPORT}/`); // index pages
  console.log(`Example app listening at http://localhost:${MYPORT}/api/animals`);
  console.log(`Example app listening at https://mercuryktzookeeper.herokuapp.com/api/animals`);
  console.log ('---------------');
  console.log (process.env.PORT); // prints undifine within local directory
 });