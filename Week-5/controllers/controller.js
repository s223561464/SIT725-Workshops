const model = require("../models/model");

async function getAllSubmissions(req, res) {
    try {
        const submissions = await model.getSubmissions();
        res.json({ status: "success", data: submissions });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Failed to fetch submissions" });
    }
}

async function createSubmission(req, res) {
    try {
        const submission = req.body;
        const addedSubmission = await model.addSubmission(submission);
        res.json({ status: "success", message: "Form submitted!", data: addedSubmission });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Failed to submit form" });
    }
}

module.exports = {
    getAllSubmissions,
    createSubmission,
};
