const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // MongoDB URI
const client = new MongoClient(uri);
const dbName = "myDB";
const collectionName = "submissions";

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

// Fetch all submissions
async function getSubmissions() {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return await collection.find().toArray();
}

// Add a new submission
async function addSubmission(data) {
    const db = client.db("myDB");
    const collection = db.collection("submissions");
    const result = await collection.insertOne(data);
    console.log("Inserted document:", result.ops[0]); // Logs inserted data for debugging
    return result.ops[0];
}


module.exports = {
    connectToDB,
    getSubmissions,
    addSubmission,
};

