import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dropzone from "../components/Dropzone";
import { Loader2, CheckCircle, AlertCircle, Sparkles, FileText, MessageSquare, Send, Bot } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function Dashboard() {
    const [resume, setResume] = useState<File | null>(null);
    const [job, setJob] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState("analysis"); // analysis | interview | chat
    const [interviewData, setInterviewData] = useState<any>(null);
    const [featureLoading, setFeatureLoading] = useState(false);

    // Chat State
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            } else {
                setUser(user);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Handle initial report from History or Session Storage
    useEffect(() => {
        if (location.state?.initialReport) {
            const r = location.state.initialReport;
            const data = {
                matchScore: r.matchScore,
                skills: r.skills,
                feedback: r.feedback,
                resumeText: r.resumeText
            };
            setResult(data);
            setJob(r.jobDescription);

            // Save to session storage for persistence
            sessionStorage.setItem("lastAnalysis", JSON.stringify({
                result: data,
                job: r.jobDescription
            }));

            // Clear state so refresh doesn't keep reloading it
            window.history.replaceState({}, document.title);
        } else {
            // Try to recover from session storage
            const saved = sessionStorage.getItem("lastAnalysis");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setResult(parsed.result);
                    setJob(parsed.job);
                } catch (e) {
                    console.error("Failed to parse saved analysis");
                }
            }
        }
    }, [location.state]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const submit = async () => {
        if (!resume || !job) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        setLoading(true);
        setResult(null);
        setInterviewData(null);
        setChatMessages([]);

        try {
            const token = await user?.getIdToken();
            const form = new FormData();
            form.append("resume", resume);
            form.append("job", job);

            const res = await axios.post("http://localhost:5000/analyze", form, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            setResult(res.data);
            setActiveTab("analysis");

            // Persist successful analysis
            sessionStorage.setItem("lastAnalysis", JSON.stringify({
                result: res.data,
                job: job
            }));

        } catch (error: any) {
            console.error("Error analyzing resume:", error);
            alert("Analysis failed: " + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const generateInterview = async () => {
        if (!result || interviewData) return;
        setFeatureLoading(true);
        try {
            const token = await user?.getIdToken();
            const res = await axios.post("http://localhost:5000/interview-questions", {
                resume: result.resumeText || "Resume Text Missing",
                job: job
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setInterviewData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setFeatureLoading(false);
        }
    };

    const handleChat = async () => {
        if (!chatInput.trim() || !result) return;

        const userMsg = chatInput;
        setChatInput("");
        setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setChatLoading(true);

        try {
            const token = await user?.getIdToken();
            const context = `Resume Content:\n${result.resumeText || "N/A"}\n\nJob Description:\n${job}`;

            const res = await axios.post("http://localhost:5000/chat", {
                message: userMsg,
                context: context
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            setChatMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
        } catch (error) {
            console.error(error);
            setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error." }]);
        } finally {
            setChatLoading(false);
        }
    };

    // Trigger generation when tab changes
    useEffect(() => {
        if (activeTab === "interview" && !interviewData && result) {
            generateInterview();
        }
    }, [activeTab, result]);


    if (!user) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Analyze your resume and get AI-powered insights.</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-5 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Upload Resume</h2>
                            <Dropzone onFileSelect={setResume} file={resume} onClear={() => setResume(null)} />
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Job Description</h2>
                            <textarea
                                className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm leading-relaxed"
                                placeholder="Paste the full job description here..."
                                onChange={e => setJob(e.target.value)}
                                value={job}
                            />
                        </div>
                        <button
                            onClick={submit}
                            disabled={loading || !resume || !job}
                            className="w-full py-4 px-6 rounded-xl text-white font-semibold transition-all shadow-md hover:shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center gap-2"
                        >
                            {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing...</> : <><Sparkles className="h-5 w-5" /> Generate Analysis</>}
                        </button>
                    </div>

                    <div className="xl:col-span-7">
                        {loading ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
                                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">Analyzing your profile...</h3>
                            </div>
                        ) : !result ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
                                <div className="bg-indigo-50 p-4 rounded-full mb-6"><FileText className="h-10 w-10 text-indigo-600" /></div>
                                <h3 className="text-lg font-semibold text-gray-900">Ready to Analyze</h3>
                                <p className="text-gray-500 max-w-sm mt-2">Upload your resume and a job description to see your Match Score, Skill Gaps, and more.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full min-h-[600px]">
                                <div className="flex border-b border-gray-100">
                                    {["analysis", "interview", "chat"].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors capitalize ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                        >
                                            {tab === "chat" ? "Chat with Resume" : tab === "interview" ? "Interview Prep" : tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-8 h-full overflow-y-auto max-h-[800px]">
                                    {activeTab === "analysis" && (
                                        <div className="space-y-8 animate-fade-in-up">
                                            <div className="flex items-center justify-between bg-indigo-50 p-6 rounded-2xl">
                                                <div>
                                                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Match Score</p>
                                                    <p className="text-gray-600 text-sm mt-1">Based on keywords & experience</p>
                                                </div>
                                                <div className="relative flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-indigo-900">{result.matchScore}%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Matching Skills</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {(result.skills || []).map((skill: string, index: number) => (
                                                        <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm font-medium">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-amber-500" /> AI Feedback</h3>
                                                <div className="bg-gray-50 rounded-xl p-6 text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
                                                    <ReactMarkdown>
                                                        {result.feedback || "No feedback available."}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "interview" && (
                                        <div className="space-y-6">
                                            {featureLoading ? (
                                                <div className="flex flex-col items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" /><p className="text-gray-500">Generating interview questions...</p></div>
                                            ) : interviewData ? (
                                                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100 prose prose-sm max-w-none">
                                                    <ReactMarkdown>
                                                        {interviewData.questions || "No questions generated."}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-500">Click tab to generate</div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "chat" && (
                                        <div className="flex flex-col h-[500px]">
                                            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                {chatMessages.length === 0 && (
                                                    <div className="text-center text-gray-400 mt-20">
                                                        <Bot className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                                        <p>Ask anything about your resume or the job description!</p>
                                                    </div>
                                                )}
                                                {chatMessages.map((msg, i) => (
                                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
                                                            }`}>
                                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div ref={chatEndRef} />
                                                {chatLoading && <div className="flex justify-start"><div className="bg-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 animate-pulse">Typing...</div></div>}
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={chatInput}
                                                    onChange={e => setChatInput(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleChat()}
                                                    placeholder="Ask a question..."
                                                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                />
                                                <button
                                                    onClick={handleChat}
                                                    disabled={!chatInput.trim() || chatLoading}
                                                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                                >
                                                    <Send className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

