require("dotenv").config();
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


const OPENROUTER_API_KEY = (process.env.OPENROUTER_API_KEY || "").trim();
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const aiClient = axios.create({
    baseURL: OPENROUTER_BASE_URL,
    headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://ai-resume-platform.com", // Optional, for OpenRouter tracking
        "X-Title": "AI Resume Platform", // Optional, for OpenRouter tracking
        "Content-Type": "application/json"
    }
});

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
        console.log("Analysis starting for user:", req.user.uid);
        const job = req.body.job;
        if (!req.file) {
            console.warn("No resume file provided");
            return res.status(400).json({ error: "No resume file uploaded" });
        }
        const pdf = require("pdf-parse");

        let resumeText = "";
        console.log("Processing file type:", req.file.mimetype);
        if (req.file.mimetype === "application/pdf") {
            const data = await pdf(req.file.buffer);
            resumeText = data.text;
        } else {
            resumeText = req.file.buffer.toString();
        }
        console.log("Resume extraction complete, length:", resumeText.length);

        // Direct AI Analysis using OpenRouter
        const system_prompt = `
        You are an expert Applicant Tracking System (ATS) and Technical Recruiter.
        Your task is to evaluate resumes against job descriptions with high precision.
        Return ONLY a valid JSON object with the following structure:
        {
            "matchScore": <integer between 0-100>,
            "skills": [<list of strings, extracting only relevant technical and soft skills present in the resume that match the job>],
            "feedback": "<detailed feedback string explaining the score, missing skills, and suggestions for improvement>"
        }
        exclude any other text or markdown formatting (like \`\`\`json).
        `;

        const user_prompt = `
        Job Description:
        ${job}

        Resume Content:
        ${resumeText}
        `;

        console.log("Calling OpenRouter API...");
        const aiResponse = await aiClient.post("/chat/completions", {
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_prompt }
            ],
            temperature: 0.2,
            max_tokens: 1500
        });

        console.log("AI Response received");
        let content = aiResponse.data.choices[0].message.content.trim();
        console.log("RAW AI CONTENT:", content);

        // Clean potential markdown code blocks
        if (content.startsWith("```")) {
            content = content.replace(/```json/g, "").replace(/```/g, "").trim();
        }

        const aiData = JSON.parse(content);
        console.log("JSON parsed successfully");

        const reportData = {
            userId: req.user.uid,
            jobDescription: job,
            matchScore: aiData.matchScore,
            skills: aiData.skills,
            feedback: aiData.feedback,
            createdAt: new Date().toISOString()
        };

        // Save to Firestore
        console.log("Saving report to Firestore...");
        const docRef = await db.collection("reports").add(reportData);
        console.log("Report saved with ID:", docRef.id);

        res.json({ id: docRef.id, ...reportData, resumeText: resumeText });
    } catch (error) {
        console.error("FULL ERROR IN /analyze:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
            stack: error.stack,
            responseData: error.response ? error.response.data : null
        });
    }
});

// Get History Endpoint
app.get("/history", verifyToken, async (req, res) => {
    try {
        // Removed .orderBy() to prevent Firebase missing index error
        const snapshot = await db.collection("reports")
            .where("userId", "==", req.user.uid)
            .get();

        const reports = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));

        // Sort in memory to avoid requiring a composite index in Firestore
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

// Interview Questions Proxy replaced with direct AI call
app.post("/interview-questions", verifyToken, async (req, res) => {
    try {
        const { resume, job } = req.body;
        const prompt = `Based on the resume content and job description below, generate 5 technical interview questions and 5 behavioral interview questions.\nResume: ${resume}\nJob: ${job}`;

        const aiResponse = await aiClient.post("/chat/completions", {
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1500
        });

        res.json({ questions: aiResponse.data.choices[0].message.content });
    } catch (error) {
        console.error("Error generating questions:", error.message);
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

// Chat Proxy replaced with direct AI call
app.post("/chat", verifyToken, async (req, res) => {
    try {
        const { message, context } = req.body;
        const system_prompt = "You are a helpful career assistant having a conversation about the user's resume. Use the provided context (resume/job) to answer questions.";

        const aiResponse = await aiClient.post("/chat/completions", {
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: (context ? `Context:\n${context}\n\nUser Question: ${message}` : message) }
            ],
            max_tokens: 1500
        });

        res.json({ reply: aiResponse.data.choices[0].message.content });
    } catch (error) {
        console.error("Error in chat:", error.message);
        res.status(500).json({ error: "Chat failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
