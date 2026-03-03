import Sidebar from "../components/Sidebar";
import { Search, PlayCircle, BookOpen, MessageSquare, ExternalLink } from "lucide-react";

export default function HelpCenter() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <div className="bg-indigo-600 rounded-2xl p-10 mb-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <h1 className="text-3xl font-black text-white mb-4 relative z-10">How can we help you today?</h1>
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search guides, FAQs, or tutorials..." className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg outline-none font-medium text-gray-800" onKeyDown={(e) => { if (e.key === 'Enter') alert('Searching Help Center...'); }} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: BookOpen, title: 'Getting Started', desc: 'Learn how to upload and analyze.', action: "Opening Getting Started Guide..." },
                        { icon: PlayCircle, title: 'Video Tutorials', desc: 'Watch step-by-step masterclasses.', action: "Loading Video Library..." },
                        { icon: MessageSquare, title: 'Live Chat', desc: 'Talk to our support engineers.', action: "Connecting to support agent..." },
                    ].map((item, i) => (
                        <div key={i} onClick={() => alert(item.action)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-sm whitespace-nowrap">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            'How does the AI Resume Match Score work?',
                            'Is my uploaded resume data secure and private?',
                            'How do I cancel my Pro subscription?',
                            'Does this bypass Workday ATS systems?'
                        ].map((q, i) => (
                            <div key={i} onClick={() => alert(`Expanding FAQ: ${q}`)} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer flex justify-between items-center group transition">
                                <span className="font-bold text-gray-700">{q}</span>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
