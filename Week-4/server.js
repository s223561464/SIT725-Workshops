var express = require("express");
var app = express();
var { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://localhost:27017"; // Your MongoDB URI
const client = new MongoClient(uri);

// Database and collection names
const dbName = "myDB";
const collectionName = "pizzaMenu";

// Use Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic add two numbers functionality
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
};

app.get("/addTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2);
    res.json({ statusCode: 200, data: result });
});

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

// Fetch all data from MongoDB
app.get("/getPizzas", async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Fetch all pizzas
        const pizzas = await collection.find().toArray();
        res.json({ statusCode: 200, data: pizzas });
    } catch (err) {
        res.json({ statusCode: 500, message: "Error fetching data from MongoDB" });
    }
});

// Insert pizza data into MongoDB
app.post("/addPizza", async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const pizza = req.body; // Pizza data from request body

        // Insert pizza data into MongoDB
        const result = await collection.insertOne(pizza);
        res.json({ statusCode: 200, message: "Pizza added successfully", data: result });
    } catch (err) {
        res.json({ statusCode: 500, message: "Error inserting pizza data" });
    }
});

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening on port " + port);
    connectToDB(); // Connect to MongoDB when the server starts
});
