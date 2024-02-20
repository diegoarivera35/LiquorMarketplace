const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb so we can create a client

//DB SETTINGS
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/`;
const client = new MongoClient(dbUrl);

//DATABASE FUNCTIONS 

//Function to select marketplace as the database and return it.
async function connection() {
  db = client.db("marketplace"); //select marketplace
  return db;
}

//Function to return all documents from the menuWhiskeys collection.
async function getWhiskeys() {
  db = await connection();
  let results = db.collection("whiskeys").find({}); //select all
  resultsArray = await results.toArray(); //toArray() is an async function
  return resultsArray;
}

//Function to insert document into menuWhiskeys collection using insertOne().
async function addWhiskey(whiskey) {
  db = await connection();
  let status = await db.collection("whiskeys").insertOne(whiskey);
  console.log("whiskey added");
}

/* Async function to delete one document by _id. */ 
async function deleteWhiskey(id) { 
  db = await connection(); 
  const deleteIdFilter = { _id: new ObjectId(id) }; 
  const result = await db.collection("whiskeys").deleteOne(deleteIdFilter); 
  if (result.deletedCount === 1) 
    console.log("delete successful"); 
} 

/* Async function to select one document by _id. */ 
async function getSingleWhiskey(id) { 
  db = await connection(); 
  const editIdFilter = { _id: new ObjectId(id) }; 
  const result = db.collection("whiskeys").findOne(editIdFilter); 
  return result; 
} 

/* Async function to edit one document. */ 
async function editWhiskey(filter, whiskey) { 
  //fill this out //https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/ 
}

module.exports = {
  getWhiskeys, 
  addWhiskey, 
  deleteWhiskey, 
  getSingleWhiskey, 
  editWhiskey
};