import Sidebar from "../components/Sidebar";
import { Map, Flag, Target, ChevronDown, CheckCircle2 } from "lucide-react";

export default function CareerRoadmap() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Career Roadmap</h1>
                        <p className="text-gray-600 font-medium">Your step-by-step action plan to reach your target goal.</p>
                    </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                            <Target className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Target Role</label>
                            <div onClick={() => alert("Opening target role selector...")} className="flex items-center justify-between cursor-pointer group">
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">Senior System Architect</h2>
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
                    <div className="w-full sm:w-auto shrink-0 flex items-center gap-4">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Timeline</span>
                            <span className="text-lg font-bold text-gray-900">6 Months</span>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                                <circle cx="50" cy="50" r="40" stroke="#4f46e5" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="200" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-900">20%</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {[
                        { title: 'Month 1: AWS Fundamentals', desc: 'Secure AWS Cloud Practitioner cert.', status: 'completed' },
                        { title: 'Month 2-3: Advanced Microservices', desc: 'Build a scalable load-balanced node app.', status: 'active' },
                        { title: 'Month 4-5: System Design Prep', desc: 'Study Alex Xu\'s framework & grokking.', status: 'upcoming' },
                        { title: 'Month 6: Interview Cycles', desc: 'Start applying for Architect roles.', status: 'upcoming' },
                    ].map((phase, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shadow-gray-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${phase.status === 'completed' ? 'bg-indigo-600 text-white' : phase.status === 'active' ? 'bg-amber-400 text-white animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                                {phase.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                            </div>

                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md cursor-pointer" onClick={() => alert(`Viewing details for milestone: ${phase.title}`)}>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase mb-2 inline-block ${phase.status === 'completed' ? 'bg-indigo-50 text-indigo-700' : phase.status === 'active' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{phase.status}</span>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{phase.title}</h3>
                                <p className="text-gray-500 text-sm font-medium">{phase.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-green-500 text-white shadow shadow-gray-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 cursor-pointer" onClick={() => alert("Final Goal: Senior System Architect reached!")}>
                            <Flag className="w-5 h-5" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
