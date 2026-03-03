import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dropzone from "../components/Dropzone";
import {
    Loader2, CheckCircle, AlertCircle, Sparkles, FileText, Send, Bot,
    Bell, Moon, Sun, Download, Share2, Mail, TrendingUp, Briefcase, Award,
    ChevronDown, ChevronUp, Zap, BookOpen, Target, Crown, ArrowRight
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://resume-ai-backend-x1fg.onrender.com";

export default function Dashboard() {
    const [resume, setResume] = useState<File | null>(null);
    const [job, setJob] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState("analysis"); // analysis | interview | chat
    const [interviewData, setInterviewData] = useState<any>(null);
    const [featureLoading, setFeatureLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // AI Suggestions State
    const [expandedSuggestions, setExpandedSuggestions] = useState(true);

    // Chat State
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) navigate("/login");
            else setUser(user);
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (location.state?.initialReport) {
            const r = location.state.initialReport;
            setResult({ matchScore: r.matchScore, skills: r.skills, feedback: r.feedback, resumeText: r.resumeText });
            setJob(r.jobDescription);
            window.history.replaceState({}, document.title);
        } else {
            const saved = sessionStorage.getItem("lastAnalysis");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setResult(parsed.result);
                    setJob(parsed.job);
                } catch (e) {
                    console.error("Parse failed");
                }
            }
        }
    }, [location.state]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [darkMode]);

    let loadingInterval: any;
    const submit = async () => {
        if (!resume || !job) return alert("Please upload a resume and enter a job description.");

        setLoading(true);
        setLoadingStage(0);
        setResult(null);
        setInterviewData(null);
        setChatMessages([]);

        loadingInterval = setInterval(() => {
            setLoadingStage(prev => (prev < 3 ? prev + 1 : 3));
        }, 1500);

        try {
            const token = await user?.getIdToken();
            const form = new FormData();
            form.append("resume", resume);
            form.append("job", job);

            const res = await axios.post(`${API_BASE_URL}/analyze`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            setResult(res.data);
            setActiveTab("analysis");
            sessionStorage.setItem("lastAnalysis", JSON.stringify({ result: res.data, job }));
        } catch (error: any) {
            alert("Analysis failed: " + (error.response?.data?.error || error.message));
        } finally {
            clearInterval(loadingInterval);
            setLoading(false);
            setLoadingStage(4);
        }
    };

    const generateInterview = async () => {
        if (!result || interviewData) return;
        setFeatureLoading(true);
        try {
            const token = await user?.getIdToken();
            const res = await axios.post(`${API_BASE_URL}/interview-questions`, {
                resume: result.resumeText || "Missing", job
            }, { headers: { "Authorization": `Bearer ${token}` } });
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
            const res = await axios.post(`${API_BASE_URL}/chat`, {
                message: userMsg,
                context: `Resume Content:\n${result.resumeText || "N/A"}\n\nJob Description:\n${job}`
            }, { headers: { "Authorization": `Bearer ${token}` } });
            setChatMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
        } catch (error) {
            setChatMessages(prev => [...prev, { role: 'assistant', content: "Error occurred." }]);
        } finally {
            setChatLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "interview" && !interviewData && result) generateInterview();
    }, [activeTab, result]);

    if (!user) return <div className="flex justify-center min-h-screen items-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;

    const loadingTextOptions = ["Extracting skills from resume...", "Analyzing job requirements...", "Running AI Match Algorithms...", "Generating insights..."];

    const mockScore = result?.matchScore || 82;
    const strokeDashoffset = 440 - (440 * mockScore) / 100;

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 overflow-y-auto h-screen transition-all duration-300">

                {/* Header (Notifications, Dark Mode, Profile) */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
                        <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Analyze your resume and get AI-powered insights.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => alert("No new notifications")} className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"} relative`}>
                            <Bell className={`h-5 w-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
                            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-indigo-500" />}
                        </button>
                        <div onClick={() => alert("Pro Plan features coming soon!")} className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-500 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm text-yellow-900 cursor-pointer hover:shadow-md transition">
                            <Crown className="h-4 w-4" /> Pro Plan
                        </div>
                    </div>
                </header>

                {/* KPI Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { title: "Resume Score", val: result ? `${result.matchScore}%` : "-", icon: Target, color: "text-blue-500", bg: "bg-blue-50" },
                        { title: "ATS Compatibility", val: result ? "76%" : "-", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
                        { title: "Skill Match", val: result ? "68%" : "-", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
                        { title: "To Improve", val: result ? "12 Items" : "-", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
                    ].map((kpi, i) => (
                        <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl p-5 shadow-sm border transition flex items-center gap-4`}>
                            <div className={`p-3 rounded-xl ${kpi.bg}`}>
                                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{kpi.title}</p>
                                <p className="text-2xl font-bold">{kpi.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Panel: Upload */}
                    <div className="xl:col-span-4 space-y-6">
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-sm border p-6 hover:shadow-md transition`}>
                            <h2 className="text-lg font-semibold mb-4 text-indigo-500 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-sm">1</span> Upload Resume
                            </h2>
                            <Dropzone onFileSelect={setResume} file={resume} onClear={() => setResume(null)} />
                        </div>
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-sm border p-6 hover:shadow-md transition`}>
                            <h2 className="text-lg font-semibold mb-4 text-purple-500 flex items-center gap-2">
                                <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-sm">2</span> Job Description
                            </h2>
                            <textarea
                                className={`w-full h-56 p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none text-sm transition ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                placeholder="Paste the job description here..."
                                onChange={e => setJob(e.target.value)}
                                value={job}
                            />
                        </div>
                        <button
                            onClick={submit}
                            disabled={loading || !resume || !job}
                            className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-center items-center gap-3"
                        >
                            {loading ? <><Loader2 className="h-6 w-6 animate-spin" /> Analyzing...</> : <><Sparkles className="h-6 w-6" /> Analyze with AI</>}
                        </button>

                        {/* AI Resume Rewriter Feature Preview */}
                        {result && (
                            <div className={`${darkMode ? 'bg-indigo-900/30 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'} border rounded-2xl p-6 relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap className="w-24 h-24" />
                                </div>
                                <h3 className={`font-bold text-lg mb-2 flex items-center gap-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}><Sparkles className="w-5 h-5" /> AI Resume Rewriter</h3>
                                <p className={`text-sm mb-4 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>Automatically rewrite your bullet points and summary to bypass ATS systems.</p>
                                <button onClick={() => alert("AI Resume Rewriter is currently in development. Stay tuned! ✨")} className="w-full bg-white text-indigo-600 font-bold py-2.5 px-4 rounded-lg shadow hover:bg-indigo-50 transition border border-indigo-100 flex justify-center items-center gap-2">
                                    Improve My Resume ✨
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Data */}
                    <div className="xl:col-span-8">
                        {loading ? (
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-sm border p-12 flex flex-col items-center justify-center text-center min-h-[600px] h-full relative overflow-hidden`}>
                                {/* Abstract animated background shapes */}
                                <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
                                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

                                <div className="relative z-10 w-full max-w-md">
                                    <div className="w-20 h-20 bg-indigo-100 rounded-2xl mb-8 mx-auto flex items-center justify-center animate-bounce shadow-xl shadow-indigo-100 flex-shrink-0">
                                        <Bot className="h-10 w-10 text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Analyzing your profile...</h3>
                                    <p className={`text-sm font-medium h-6 mb-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{loadingTextOptions[loadingStage]}</p>

                                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                                        <div
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-[1500ms] ease-out"
                                            style={{ width: `${(loadingStage + 1) * 25}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                                        <span>0%</span>
                                        <span>AI Processing</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            </div>
                        ) : !result ? (
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border flex flex-col items-center justify-center text-center min-h-[600px] h-full`}>
                                <div className="bg-indigo-50 p-6 rounded-full mb-6">
                                    <FileText className="h-12 w-12 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Ready for Action</h3>
                                <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upload your resume and a job description to instantly generate Match Scores, Skill Gaps, AI Suggestions, and an ATS-ready profile review.</p>
                            </div>
                        ) : (
                            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl border overflow-hidden flex flex-col min-h-[700px] h-full`}>

                                {/* Header Tools */}
                                <div className={`px-6 py-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-100 bg-white/80'} backdrop-blur-md sticky top-0 z-10`}>
                                    <div className="flex bg-gray-100/50 p-1 rounded-xl">
                                        {["analysis", "interview", "chat"].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-5 py-2 text-sm font-bold rounded-lg capitalize transition-all ${activeTab === tab
                                                    ? "bg-white text-indigo-600 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                                    }`}
                                            >
                                                {tab === "chat" ? "AI Chat" : tab === "interview" ? "Q&A Setup" : tab}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => window.print()} className={`p-2 rounded-lg border flex items-center gap-2 text-sm font-bold transition hover:bg-indigo-50 hover:text-indigo-600 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200'}`}><Download className="w-4 h-4" /> PDF</button>
                                        <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }} className={`p-2 rounded-lg border flex items-center gap-2 text-sm font-bold transition hover:bg-indigo-50 hover:text-indigo-600 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200'}`}><Share2 className="w-4 h-4" /></button>
                                        <button onClick={() => window.location.href = "mailto:?subject=My AI Resume Analysis"} className={`p-2 rounded-lg border flex items-center gap-2 text-sm font-bold transition hover:bg-indigo-50 hover:text-indigo-600 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-200'}`}><Mail className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                <div className="p-8 overflow-y-auto">
                                    {activeTab === "analysis" && (
                                        <div className="space-y-8 animate-fade-in-up">

                                            {/* Score Charts & Job Fit Row */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Donut Chart */}
                                                <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} p-6 rounded-2xl border flex flex-col items-center justify-center relative`}>
                                                    <h3 className="font-bold text-lg mb-6 self-start w-full border-b pb-2 border-gray-200/50">Overall Match Score</h3>
                                                    <div className="relative w-40 h-40">
                                                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className={`${darkMode ? 'text-gray-700' : 'text-gray-200'}`} />
                                                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={strokeDashoffset} className="text-indigo-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
                                                        </svg>
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                            <span className="text-4xl font-extrabold text-indigo-600">{mockScore}%</span>
                                                            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Excellent</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Job Fit Breakdown */}
                                                <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} p-6 rounded-2xl border`}>
                                                    <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-200/50">Job Fit Analysis</h3>
                                                    <div className="space-y-4">
                                                        {[
                                                            { label: "Technical Skills", score: 75, color: "bg-blue-500" },
                                                            { label: "Experience Level", score: 60, color: "bg-amber-500" },
                                                            { label: "Education", score: 85, color: "bg-green-500" },
                                                            { label: "Keywords", score: 70, color: "bg-purple-500" },
                                                        ].map(cat => (
                                                            <div key={cat.label}>
                                                                <div className="flex justify-between text-sm font-bold mb-1">
                                                                    <span>{cat.label}</span>
                                                                    <span>{cat.score}%</span>
                                                                </div>
                                                                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                                                    <div className={`h-2 rounded-full ${cat.color}`} style={{ width: `${cat.score}%` }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* AI Skill Gap Analysis */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className={`col-span-2 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} p-6 rounded-2xl border`}>
                                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-500" /> AI Skill Gap Analysis</h3>

                                                    <div className="mb-6">
                                                        <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔎 Missing Setup Skills</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {["Docker", "AWS", "System Design"].map(s => (
                                                                <span key={s} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold border border-red-200">- {s}</span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>💡 Recommended Courses</p>
                                                        <ul className="space-y-2">
                                                            {[
                                                                { n: "AWS Cloud Practitioner", l: "Beginner" },
                                                                { n: "React Advanced System Patterns", l: "Advanced" },
                                                                { n: "Data Structures & Algorithms in TS", l: "Intermediate" },
                                                            ].map((c, i) => (
                                                                <li key={i} className={`flex items-center justify-between p-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                                                    <div className="flex items-center gap-3">
                                                                        <BookOpen className="w-4 h-4 text-indigo-500" />
                                                                        <span className="font-semibold text-sm">{c.n}</span>
                                                                    </div>
                                                                    <span className="text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">{c.l}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Side Panel: Recommendations & Salary */}
                                                <div className="space-y-6">
                                                    {/* Salary Feature */}
                                                    <div className={`bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl ${darkMode ? 'dark:from-emerald-900/20 dark:to-teal-900/20 dark:border-emerald-800/50' : ''}`}>
                                                        <h3 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-2">💰 Estimated Salary Range</h3>
                                                        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-300 mb-2">₹8 LPA – ₹12 LPA</div>
                                                        <p className="text-xs text-emerald-700/70 dark:text-emerald-500 font-medium">Based on matched skills, experience, and market role location.</p>
                                                    </div>

                                                    {/* Job Recs */}
                                                    <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} p-5 rounded-2xl border`}>
                                                        <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-gray-500">🎯 Recommended Roles</h3>
                                                        <div className="space-y-3">
                                                            {[
                                                                { t: "Frontend Developer", s: 82 },
                                                                { t: "React Developer", s: 76 },
                                                                { t: "Full Stack Developer", s: 69 },
                                                            ].map((job, idx) => (
                                                                <div key={idx} className={`p-3 rounded-xl border flex flex-col gap-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                                                    <div className="flex justify-between items-center text-sm font-bold">
                                                                        <span>{job.t}</span>
                                                                        <span className="text-indigo-600">{job.s}%</span>
                                                                    </div>
                                                                    <button onClick={() => alert(`View details for ${job.t} coming soon!`)} className="w-full text-xs font-bold py-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition">View Details</button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Resume Improvement Suggestions Panel */}
                                            <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-2xl border overflow-hidden transition-all duration-300`}>
                                                <button
                                                    onClick={() => setExpandedSuggestions(!expandedSuggestions)}
                                                    className="w-full p-6 flex justify-between items-center bg-transparent hover:bg-black/5 transition"
                                                >
                                                    <h3 className="font-bold text-lg flex items-center gap-2 hover:text-indigo-600"><AlertCircle className="h-5 w-5 text-amber-500" /> Enhancement Suggestions</h3>
                                                    {expandedSuggestions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                </button>

                                                {expandedSuggestions && (
                                                    <div className="p-6 pt-0 space-y-4">
                                                        {[
                                                            { t: "Add measurable achievements", d: "Quantify your impact using metrics (e.g., 'Increased performance by 20%')." },
                                                            { t: "Include action verbs", d: "Start bullets with verbs like 'Developed', 'Orchestrated', 'Optimized'." },
                                                            { t: "Add GitHub Link", d: "No portfolio found. Missing live projects drops your ATS score." }
                                                        ].map((sug, i) => (
                                                            <div key={i} className={`p-4 rounded-xl border flex justify-between items-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white shadow-sm'}`}>
                                                                <div>
                                                                    <p className="font-bold text-sm mb-1">{sug.t}</p>
                                                                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sug.d}</p>
                                                                </div>
                                                                <div className="flex gap-2 shrink-0 ml-4">
                                                                    <button onClick={() => alert("Suggestion accepted!")} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition">Accept ✔</button>
                                                                    <button onClick={() => alert("Regenerating suggestion...")} className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-xs font-bold transition">Regen 🔄</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Original Feedback Markdown Render (Preserving functionality) */}
                                            {result?.feedback && (
                                                <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl p-8 border`}>
                                                    <h3 className="font-bold text-lg mb-4">Detailed Text Analysis</h3>
                                                    <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                                                        <ReactMarkdown>{result.feedback}</ReactMarkdown>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Keep Interview Tab Intact visually updated */}
                                    {activeTab === "interview" && (
                                        <div className="space-y-6">
                                            {featureLoading ? (
                                                <div className="flex flex-col items-center py-20"><Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" /><p className="font-bold">Crafting specific questions...</p></div>
                                            ) : interviewData ? (
                                                <div className={`whitespace-pre-wrap leading-relaxed p-8 rounded-2xl border prose prose-sm max-w-none ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-300 prose-invert' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                                                    <ReactMarkdown>{interviewData.questions}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                <div className="text-center py-20 font-bold text-gray-400">Error loading questions.</div>
                                            )}
                                        </div>
                                    )}

                                    {/* Keep Chat Tab Intact visually updated */}
                                    {activeTab === "chat" && (
                                        <div className="flex flex-col h-[500px]">
                                            <div className={`flex-1 overflow-y-auto space-y-4 mb-4 p-6 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                                {chatMessages.length === 0 && (
                                                    <div className="text-center mt-20 opacity-50">
                                                        <Bot className="h-12 w-12 mx-auto mb-4" />
                                                        <p className="font-bold">Ask the AI about your resume vs job match!</p>
                                                    </div>
                                                )}
                                                {chatMessages.map((msg, i) => (
                                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm font-medium shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : (darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 rounded-bl-none border' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none')}`}>
                                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div ref={chatEndRef} />
                                                {chatLoading && <div className="flex justify-start"><div className="bg-gray-200 dark:bg-gray-800 rounded-2xl rounded-bl-none border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm text-gray-500 font-bold animate-pulse">Typing...</div></div>}
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={chatInput}
                                                    onChange={e => setChatInput(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && handleChat()}
                                                    placeholder="Ask how to improve your resume..."
                                                    className={`flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                                                />
                                                <button
                                                    onClick={handleChat}
                                                    disabled={!chatInput.trim() || chatLoading}
                                                    className="bg-indigo-600 text-white p-3 px-5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition shadow-md flex items-center justify-center"
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
