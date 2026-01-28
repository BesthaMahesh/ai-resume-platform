const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccount.json")),
    });
    console.log("Firebase Admin Initialized");
} catch (error) {
    console.error("Firebase Admin Initialization Failed:", error.message);
}

const mongoose = require("mongoose");
const mongoUser = process.env.MONGO_USER || "";
const mongoPass = process.env.MONGO_PASS || "";
const mongoHost = process.env.MONGO_HOST || "localhost";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDb = "ai-resume-platform";

// Construct URI with auth if credentials exist
const mongoUri = mongoUser && mongoPass
    ? `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDb}?authSource=admin`
    : `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const ReportSchema = new mongoose.Schema({
    userId: String,
    jobDescription: String,
    matchScore: Number,
    skills: [String],
    feedback: String,
    createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", ReportSchema);
const upload = multer();

// Middleware to verify Firebase ID Token
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
}

// Protected Route
app.post("/analyze", verifyToken, upload.single("resume"), async (req, res) => {
    try {
        const job = req.body.job;
        if (!req.file) {
            return res.status(400).json({ error: "No resume file uploaded" });
        }
        const pdf = require("pdf-parse");

        let resumeText = "";
        if (req.file.mimetype === "application/pdf") {
            const data = await pdf(req.file.buffer);
            resumeText = data.text;
        } else {
            resumeText = req.file.buffer.toString();
        }

        // Call AI Service
        const aiRes = await axios.post("http://localhost:8000/analyze", {
            resume: resumeText,
            job
        });

        const reportData = {
            userId: req.user.uid, // Link report to authenticated user
            jobDescription: job,  // Save job description for history
            matchScore: aiRes.data.matchScore,
            skills: aiRes.data.skills,
            feedback: aiRes.data.feedback
        };

        // Save to MongoDB
        const newReport = await Report.create(reportData);

        // Return the report data including the extracted text (needed for follow-up AI tasks)
        res.json({ id: newReport._id, ...reportData, resumeText: resumeText });
    } catch (error) {
        console.error("Error in /analyze:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Get History Endpoint
app.get("/history", verifyToken, async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.user.uid }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        console.error("Error fetching history:", error.message);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Delete History Endpoint
app.delete("/history/:id", verifyToken, async (req, res) => {
    try {
        await Report.findOneAndDelete({ _id: req.params.id, userId: req.user.uid });
        res.json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error.message);
        res.status(500).json({ error: "Failed to delete report" });
    }
});

// Interview Questions Proxy
app.post("/interview-questions", verifyToken, async (req, res) => {
    try {
        const { resume, job } = req.body;
        const aiRes = await axios.post("http://localhost:8000/interview-questions", { resume, job });
        res.json(aiRes.data);
    } catch (error) {
        console.error("Error generating questions:", error.message);
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

// Chat Proxy
app.post("/chat", verifyToken, async (req, res) => {
    try {
        const { message, context } = req.body;
        const aiRes = await axios.post("http://localhost:8000/chat", { message, context });
        res.json(aiRes.data);
    } catch (error) {
        console.error("Error in chat:", error.message);
        res.status(500).json({ error: "Chat failed" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
