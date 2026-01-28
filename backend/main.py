from fastapi import FastAPI
from openai import OpenAI
from pydantic import BaseModel
import json

app = FastAPI()

import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AnalyzeRequest(BaseModel):
    resume: str
    job: str

@app.post("/analyze")
async def analyze(data: AnalyzeRequest):
    system_prompt = """
    You are an expert Applicant Tracking System (ATS) and Technical Recruiter.
    Your task is to evaluate resumes against job descriptions with high precision.
    Return ONLY a valid JSON object with the following structure:
    {
        "matchScore": <integer between 0-100>,
        "skills": [<list of strings, extracting only relevant technical and soft skills present in the resume that match the job>],
        "feedback": "<detailed feedback string explaining the score, missing skills, and suggestions for improvement>"
    }
    exclude any other text or markdown formatting (like ```json).
    """
    
    user_prompt = f"""
    Job Description:
    {data.job}

    Resume Content:
    {data.resume}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2
        )
        content = response.choices[0].message.content.strip()
        # Clean potential markdown code blocks if the model includes them despite instructions
        if content.startswith("```"):
            content = content.replace("```json", "").replace("```", "").strip()
            
        result = json.loads(content)
        return result

    except Exception as e:
        return {
            "matchScore": 0,
            "skills": [],
            "feedback": f"Error during analysis: {str(e)}"
        }

class ChatRequest(BaseModel):
    message: str
    context: str

@app.post("/interview-questions")
async def interview_questions(data: AnalyzeRequest):
    prompt = f"Based on the resume content and job description below, generate 5 technical interview questions and 5 behavioral interview questions.\nResume: {data.resume}\nJob: {data.job}"
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return {"questions": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

@app.post("/chat")
async def chat(data: ChatRequest):
    system_prompt = "You are a helpful career assistant having a conversation about the user's resume. Use the provided context (resume/job) to answer questions."
    user_prompt = f"Context:\n{data.context}\n\nUser Question: {data.message}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
