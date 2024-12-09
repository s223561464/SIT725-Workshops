const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controllers/controller");
const { connectToDB } = require("./models/model");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/submissions", controller.getAllSubmissions);
app.post("/submitForm", controller.createSubmission);

// Start the server
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectToDB(); // Connect to MongoDB when the server starts
});
