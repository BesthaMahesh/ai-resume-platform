import Sidebar from "../components/Sidebar";
import { DollarSign, Crown, TrendingUp, Briefcase } from "lucide-react";

export default function SalaryInsights() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <div className="bg-gradient-to-r from-emerald-200 to-emerald-400 text-emerald-900 font-black px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 mb-3"><Crown className="w-3 h-3" /> PRO FEATURE</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2"><DollarSign className="w-6 h-6 text-emerald-500" /> Salary Insights</h1>
                    <p className="text-gray-600 font-medium">Discover your market value based on your actual skills and demand.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                    <div className="text-center">
                        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2 cursor-pointer hover:text-indigo-600" onClick={() => alert("Change location tracking...")}>Estimated Market Value (SF / Remote)</p>
                        <h2 className="text-5xl font-black text-gray-900 mb-2">₹135K - ₹160K <span className="text-xl text-gray-400">/yr</span></h2>
                        <p className="text-emerald-600 font-bold flex items-center justify-center gap-1"><TrendingUp className="w-4 h-4" /> +14% higher than avg due to React + AWS skills</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-6 border-b pb-3">Skill Impact on Salary</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'React', val: '+₹15K', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                                { name: 'AWS', val: '+₹20K', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                                { name: 'TypeScript', val: '+₹10K', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                                { name: 'System Design', val: 'Missing', bg: 'bg-red-50 text-red-700 border-red-100' },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition" onClick={() => alert(`Viewing market demand chart for ${s.name}...`)}>
                                    <span className="font-bold text-gray-700">{s.name}</span>
                                    <span className={`px-3 py-1 rounded-lg text-sm font-black border ${s.bg}`}>{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-6 border-b pb-3">Negotiation Advice</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-emerald-200 transition" onClick={() => alert("Expanding negotiation leverage details...")}>
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-2"><Briefcase className="w-4 h-4 text-emerald-600" /> Leverage Points</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                    <li>Highlight your 99.9% uptime achievement.</li>
                                    <li>Emphasize your full-stack capability to reduce hiring needs.</li>
                                </ul>
                            </div>
                            <button onClick={() => alert("Generating personalized negotiation script... AI is analyzing current market trends.")} className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 flex justify-center items-center gap-2 shadow-sm">
                                Generate Negotiation Script
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
