import Sidebar from "../components/Sidebar";
import { BarChart2, TrendingUp, BookOpen, Clock, Target, ArrowRight } from "lucide-react";

export default function SkillGap() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Skill Gap Analysis</h1>
                    <p className="text-gray-600 font-medium">Identify missing skills from target roles and discover personalized learning paths.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Priority Skills */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-indigo-500" /> Priority Skills to Learn</h2>
                            <div className="space-y-4">
                                {[
                                    { skill: 'Docker', demand: 'High', time: '2 weeks', difficulty: 'Medium', progress: 20 },
                                    { skill: 'AWS CloudFormation', demand: 'Very High', time: '4 weeks', difficulty: 'Hard', progress: 5 },
                                    { skill: 'GraphQL', demand: 'Medium', time: '1 week', difficulty: 'Easy', progress: 60 }
                                ].map((s, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-gray-900">{s.skill}</h3>
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${s.demand === 'Very High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{s.demand} Demand</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                                                <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {s.difficulty}</span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-48 shrink-0 relative">
                                            <div className="h-2 w-full bg-gray-200 rounded-full">
                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-500 mt-1 block text-right">{s.progress}% mastery</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Learning Path */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /> Recommended Courses</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div onClick={() => alert("Redirecting to Udemy: Docker Mastery")} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition cursor-pointer">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                                        <BookOpen className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">Docker Mastery (Udemy)</h4>
                                    <p className="text-xs text-gray-500 mb-3">Matches your skill gap for: Docker.</p>
                                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">View Course <ArrowRight className="w-3 h-3" /></span>
                                </div>
                                <div onClick={() => alert("Redirecting to AWS Platform: Cloud Practitioner")} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition cursor-pointer">
                                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                                        <BookOpen className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">AWS Cloud Practitioner</h4>
                                    <p className="text-xs text-gray-500 mb-3">Matches your skill gap for: AWS.</p>
                                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">View Course <ArrowRight className="w-3 h-3" /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-indigo-500" /> Skill Strength</h2>
                            <div className="space-y-4">
                                {['Frontend Core', 'Backend API', 'DevOps', 'System Design'].map((cat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                                            <span>{cat}</span>
                                            <span>{[90, 75, 40, 20][i]}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full">
                                            <div className={`h-full rounded-full ${i < 2 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${[90, 75, 40, 20][i]}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
