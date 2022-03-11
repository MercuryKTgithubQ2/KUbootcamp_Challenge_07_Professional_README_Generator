const fs = require("fs");
const { zookeepers } = require("../data/zookeepers");
const {
   filterByQuery,
   findById,
   createNewZookeeper,
   validateZookeeper,
 } = require("../lib/zookeepers.js");

 jest.mock("fs"); // fs.writeFileSync() will be execute without actually writing anything to a file

 test("creates an zookeeper object", () => {
   const zookeeper = createNewZookeeper(
     { name: "Darlene", id: "veryrandome-idqwerty" },
     zookeepers
   );
 
   expect(zookeeper.name).toBe("Darlene");
   expect(zookeeper.id).toBe("veryrandome-idqwerty");
 });

 const startingZookeepers = [
   {
     id: "2",
     name: "Raksha",
     age: 31,
     favoriteAnimal: "penguin",
   },
   {
     id: "3",
     name: "Isabella",
     age: 67,
     favoriteAnimal: "bear",
   },
 ];
 
 test("filters by query", () => {
  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);
  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
   const result = findById("3", startingZookeepers);
   expect(result.name).toBe("Isabella");
 });

 test("validates age", () => {
   const zookeeper = {
     id: "2",
     name: "Raksha",
     age: 31,
     favoriteAnimal: "penguin",
   };
 
   const invalidZookeeper = {
     id: "3",
     name: "Isabella",
     age: "67",  // will fail the test of typeof
     favoriteAnimal: "bear",
   };
 
   const result = validateZookeeper(zookeeper);
   const result2 = validateZookeeper(invalidZookeeper);
 
   expect(result).toBe(true);
   expect(result2).toBe(false);
 });