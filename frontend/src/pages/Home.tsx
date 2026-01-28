import { Link } from "react-router-dom";
import { CheckCircle, Upload, FileText, ArrowRight, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/90 backdrop-blur-lg z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-all duration-300">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">ResumeAI</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                Log In
                            </Link>
                            <Link
                                to="/dashboard"
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
                            >
                                Get Started <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 px-4 py-1.5 rounded-full text-indigo-600 font-semibold text-xs uppercase tracking-wide mb-8 shadow-sm animate-fade-in-up">
                        <Zap className="h-3 w-3 fill-current" />
                        <span>Powered by GPT-4o</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                        Transform your resume into a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">career magnet.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
                        Our AI analyzes your resume against job descriptions to provide instant, actionable feedback. Optimize your chances and land interviews 3x faster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/dashboard"
                            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1"
                        >
                            Analyze Resume Free
                        </Link>
                    </div>

                    {/* Stats/Social Proof */}
                    <div className="mt-20 pt-10 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Resumes Analyzed", value: "10k+" },
                            { label: "Success Rate", value: "92%" },
                            { label: "Interview Calls", value: "3x" },
                            { label: "Time Saved", value: "5hrs" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Top Candidates Use ResumeAI</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We go beyond simple spell-checking. Get deep insights into how Applicant Tracking Systems (ATS) and recruiters view your profile.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Upload className="h-6 w-6 text-indigo-600" />,
                                title: "ATS Compatibility Check",
                                description: "Validate your resume format to ensure it passes automated screening software without parsing errors."
                            },
                            {
                                icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
                                title: "Smart Skill Matching",
                                description: "Identify critical skill gaps and keyword opportunities tailored specifically to your target job description."
                            },
                            {
                                icon: <Zap className="h-6 w-6 text-violet-600" />,
                                title: "AI-Powered Suggestions",
                                description: "Get specific rewrites for your bullet points to emphasize impact, results, and leadership qualities."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                                <div className="bg-white border border-slate-200 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:border-indigo-200 group-hover:scale-110 transition-all">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2026 ResumeAI Platform.build by Mahesh <span className="text-slate-600 mx-2">|</span> Built by Mahesh</p>
                </div>
            </footer>
        </div>
    );
}

