const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
let db;
try {
    let serviceAccount;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
        serviceAccount = require("./serviceAccount.json");
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    db = admin.firestore();
    console.log("Firebase Admin & Firestore Initialized");
} catch (error) {
    console.error("Firebase Admin Initialization Failed:", error.message);
}

// AI Service URL (Local fallback to http://localhost:8000)
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

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
        const aiRes = await axios.post(`${AI_SERVICE_URL}/analyze`, {
            resume: resumeText,
            job
        });

        const reportData = {
            userId: req.user.uid,
            jobDescription: job,
            matchScore: aiRes.data.matchScore,
            skills: aiRes.data.skills,
            feedback: aiRes.data.feedback,
            createdAt: new Date().toISOString()
        };

        // Save to Firestore
        const docRef = await db.collection("reports").add(reportData);

        res.json({ id: docRef.id, ...reportData, resumeText: resumeText });
    } catch (error) {
        console.error("Error in /analyze:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Get History Endpoint
app.get("/history", verifyToken, async (req, res) => {
    try {
        const snapshot = await db.collection("reports")
            .where("userId", "==", req.user.uid)
            .orderBy("createdAt", "desc")
            .get();

        const reports = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
        res.json(reports);
    } catch (error) {
        console.error("Error fetching history:", error.message);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Delete History Endpoint
app.delete("/history/:id", verifyToken, async (req, res) => {
    try {
        const reportRef = db.collection("reports").doc(req.params.id);
        const doc = await reportRef.get();

        if (!doc.exists || doc.data().userId !== req.user.uid) {
            return res.status(404).json({ error: "Report not found" });
        }

        await reportRef.delete();
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
        const aiRes = await axios.post(`${AI_SERVICE_URL}/interview-questions`, { resume, job });
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
        const aiRes = await axios.post(`${AI_SERVICE_URL}/chat`, { message, context });
        res.json(aiRes.data);
    } catch (error) {
        console.error("Error in chat:", error.message);
        res.status(500).json({ error: "Chat failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
