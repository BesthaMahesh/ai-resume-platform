import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Briefcase, FileText, CheckCircle, AlertTriangle, Download, Plus, ArrowRight, Zap, ArrowUpRight, Search } from "lucide-react";

export default function JobMatch() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Job Match Analyst</h1>
                        <p className="text-gray-600 font-medium">Compare your resume against any Job Description and find related roles.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Inputs */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-500" /> Job Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                                    <input type="text" placeholder="e.g. Senior Frontend Engineer" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                                    <textarea rows={8} placeholder="Paste the full job description here..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
                                </div>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md flex justify-center items-center gap-2 disabled:opacity-75"
                                >
                                    {isAnalyzing ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Zap className="w-5 h-5" />
                                    )}
                                    {isAnalyzing ? "Analyzing..." : "Analyze Match"}
                                </button>
                                <button onClick={() => alert("Job saved to your tracker!")} className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2">
                                    <Plus className="w-5 h-5" /> Save Job
                                </button>
                            </div>
                        </div>

                        {showResults && (
                            <div className="bg-indigo-50 p-6 rounded-2xl shadow-sm border border-indigo-100">
                                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2"><Search className="w-5 h-5 text-indigo-600" /> Related Opportunities</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Frontend Lead", company: "Spotify", match: "88%" },
                                        { title: "UI Engineer", company: "Google", match: "82%" },
                                        { title: "React Developer", company: "Meta", match: "79%" }
                                    ].map((job, idx) => (
                                        <div key={idx} className="bg-white p-3 rounded-xl border border-indigo-100 flex justify-between items-center hover:shadow-sm cursor-pointer transition">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                                                <p className="text-xs text-gray-500">{job.company}</p>
                                            </div>
                                            <div className="text-indigo-600 font-black text-sm bg-indigo-50 px-2 py-1 rounded">
                                                {job.match}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {!showResults && !isAnalyzing && (
                            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Briefcase className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Paste a job description to begin</h3>
                                <p className="text-gray-500 max-w-sm">Our AI will compare your resume against the requirements and find you related roles.</p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing match...</h3>
                                <p className="text-gray-500">Comparing your skills, experience, and education.</p>
                            </div>
                        )}

                        {showResults && (
                            <>
                                {/* Overall Score */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900">AI Match Score</h3>
                                        <p className="text-gray-500 text-sm mt-1">Based on keywords, experience, and education gaps.</p>
                                    </div>
                                    <div className="w-24 h-24 rounded-full border-8 border-green-100 border-t-green-500 flex items-center justify-center shrink-0">
                                        <span className="text-2xl font-black text-green-600">84%</span>
                                    </div>
                                </div>

                                {/* Breakdown Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Matched Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'TypeScript', 'Node.js', 'Redux', 'Jest', 'Agile'].map(kw => (
                                                <span key={kw} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold">{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Missing Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['GraphQL', 'AWS', 'Docker', 'CI/CD'].map(kw => (
                                                <span key={kw} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">{kw}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Analysis Sections */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Experience Gap Analysis</h4>
                                        <p className="text-gray-600 text-sm">You have 4 years of frontend experience. The job requires 5+ years. Consider emphasizing your leadership roles in recent projects to bridge this gap.</p>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Education Match Check</h4>
                                        <p className="text-gray-600 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Your B.S. in Computer Science meets the minimum requirements.</p>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">Improvement Suggestions</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                            <li>Add measurable metrics to your most recent role (e.g., "Improved load time by 40%").</li>
                                            <li>Include a link to a live project utilizing React and Node.js.</li>
                                        </ul>
                                    </div>
                                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                        <button onClick={() => alert("Downloading PDF Report...")} className="px-5 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition flex items-center gap-2">
                                            <Download className="w-4 h-4" /> Export Match Report (PDF)
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
