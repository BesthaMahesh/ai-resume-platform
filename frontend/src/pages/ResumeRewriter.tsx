import Sidebar from "../components/Sidebar";
import { Sparkles, Replace, Type, AlignLeft, Bot, Crown, ArrowRight } from "lucide-react";

export default function ResumeRewriter() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <div className="bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 font-black px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 mb-3"><Crown className="w-3 h-3" /> PRO FEATURE</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2"><Sparkles className="w-6 h-6 text-amber-500" /> AI Resume Rewriter</h1>
                    <p className="text-gray-600 font-medium">Bypass ATS filters by upgrading your bullet points with AI-derived industry metrics.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Original Bullet Point</h3>
                            <div className="flex gap-2">
                                <button onClick={() => alert("Switching to text mode...")} className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900"><Type className="w-4 h-4" /></button>
                                <button onClick={() => alert("Switching to bullet layout mode...")} className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-gray-900"><AlignLeft className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <textarea
                            rows={6}
                            placeholder="e.g. Fixed bugs and made the website faster."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4 font-medium"
                            defaultValue={"Made the database queries faster so the app wouldn't crash during busy times."}
                        ></textarea>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tone</label>
                                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 outline-none focus:border-indigo-500">
                                    <option>Professional & Corporate</option>
                                    <option>Creative & Modern</option>
                                    <option>Highly Technical</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={() => alert("AI is rewriting your bullet point based on selected tone...")} className="mt-auto w-full bg-indigo-600 text-white font-black py-3 rounded-xl shadow-md hover:bg-indigo-700 transition flex justify-center items-center gap-2">
                            <Bot className="w-5 h-5" /> Magic Rewrite ✨
                        </button>
                    </div>

                    {/* Output */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-500" /> AI Suggestions</h3>

                        <div className="space-y-4 flex-1">
                            {/* Option 1 */}
                            <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 relative">
                                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-bl-lg rounded-tr-lg">BEST MATCH</div>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed">
                                    "Optimized advanced SQL database queries, reducing average latency by 45% and ensuring 99.9% uptime during peak concurrent usage traffic."
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <button onClick={() => alert("Copied to clipboard!")} className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 transition">Copy to Clipboard</button>
                                </div>
                            </div>

                            {/* Option 2 */}
                            <div className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition">
                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                    "Engineered performance improvements across critical database queries, preventing system crashes during high-load periods."
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <button onClick={() => alert("Copied to clipboard!")} className="flex-1 bg-gray-100 text-gray-700 text-xs font-bold py-2 rounded-lg hover:bg-gray-200 transition">Copy to Clipboard</button>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => alert("Generating alternatives... Please wait.")} className="w-full border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2 mt-4 text-sm mt-auto">
                            <Replace className="w-4 h-4" /> Generate More Options
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
