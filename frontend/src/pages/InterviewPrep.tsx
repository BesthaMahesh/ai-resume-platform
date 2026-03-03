import Sidebar from "../components/Sidebar";
import { Mic, Video, CheckCircle2, AlertCircle, BrainCircuit } from "lucide-react";

export default function InterviewPrep() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Mock Interview</h1>
                    <p className="text-gray-600 font-medium">Practice with AI generated questions based on your actual resume.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <Mic className="w-10 h-10 text-indigo-600 animate-pulse" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Ready to begin your technical interview?</h2>
                            <p className="text-gray-500 text-center mb-8 max-w-md">Our AI will ask you 5 questions focused on your React and Node.js experience listed on your resume.</p>

                            <div className="flex gap-4">
                                <button onClick={() => alert("Microphone access requested. Starting mock interview...")} className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 shadow-sm transition flex items-center gap-2"><Mic className="w-5 h-5" /> Start Audio Mock</button>
                                <button onClick={() => alert("Camera & Microphone access requested. Starting Video Mode...")} className="bg-white text-gray-700 border border-gray-200 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 shadow-sm transition flex items-center gap-2"><Video className="w-5 h-5" /> Video Mode</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-indigo-500" /> Previous Answer Feedback</h3>
                            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                                <p className="font-bold text-gray-800 text-sm">Q: Tell me about a time you optimized a slow React application.</p>
                                <p className="text-gray-600 text-sm italic">You said: "I used useMemo and useCallback to stop re-renders..."</p>
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                    <p className="font-bold text-red-800 text-xs mb-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> AI Feedback (Score: 6/10)</p>
                                    <p className="text-red-700 text-xs">You correctly identified hooks, but you failed to mention profiling tools or identifying the actual bottleneck before applying memoization.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Question Bank</h3>
                            <div className="space-y-2">
                                {['Technical Questions', 'Behavioral Questions', 'System Design', 'HR Screening'].map(cat => (
                                    <button onClick={() => alert(`Loading ${cat} mock scenarios...`)} key={cat} className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition font-bold text-gray-700 text-sm flex justify-between items-center group">
                                        {cat}
                                        <span className="text-gray-400 group-hover:text-indigo-500">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Overall Confidence</h3>
                            <div className="flex items-center justify-center">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                        <circle cx="50" cy="50" r="40" stroke="#4f46e5" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="62.8" />
                                    </svg>
                                    <span className="absolute text-2xl font-black text-gray-900">75%</span>
                                </div>
                            </div>
                            <p className="text-center text-sm font-bold text-indigo-600 mt-4"><CheckCircle2 className="w-4 h-4 inline-block mr-1" /> Ready for screening!</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
