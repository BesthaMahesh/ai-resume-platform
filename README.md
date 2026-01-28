# AI Resume Platform

An AI-powered application that analyzes resumes against job descriptions, providing match scores, skill extraction, and improved feedback.

## Features

- **Resume Analysis**: Upload PDF or text resumes to get a match score against a job description.
- **AI Feedback**: Detailed feedback on missing skills and suggestions for improvement using OpenAI's GPT-4o-mini.
- **Interview Prep**: Generate technical and behavioral interview questions based on your resume and target job.
- **Chat Assistant**: deeply integrated chat assistant to answer questions about your resume.
- **History Tracking**: Save and manage your analysis history.

## Tech Stack

### Frontend
- **Framework**: React with TypeScript (Vite)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth

### Backend
- **Main Server**: Node.js & Express
- **AI Microservice**: Python FastAPI
- **Database**: MongoDB (Data storage), Firebase (Auth verification)
- **AI**: OpenAI API

## Setup & partial

### Prerequisites
- Node.js & npm
- Python 3.8+
- MongoDB installed locally or Atlas URI
- Firebase Project credentials

### 1. Clone the repository
```bash
git clone https://github.com/BesthaMahesh/ai-resume-platform.git
cd ai-resume-platform
```

### 2. Backend Setup (Node.js)
```bash
cd backend
npm install
# Create serviceAccount.json for Firebase Admin SDK
node server.js
```

### 3. AI Service Setup (Python)
```bash
cd backend
# Recommended: Create a virtual environment
# python -m venv venv
# source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in `backend/` with the following:

```env
OPENAI_API_KEY=your_openai_api_key
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
MONGO_HOST=localhost
MONGO_PORT=27017
```

## Running the App

1. Start the **Mongo Database**.
2. Start the **Python AI Service**:
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```
3. Start the **Node.js Backend**:
   ```bash
   cd backend
   node server.js
   ```
4. Start the **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
