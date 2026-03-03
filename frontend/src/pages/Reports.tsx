import Sidebar from "../components/Sidebar";
import { Download, FileText, Share2, Mail, Eye, Activity, BarChart3, Presentation } from "lucide-react";

export default function Reports() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Analysis Reports</h1>
                        <p className="text-gray-600 font-medium">Detailed overviews of your resume's competitive standing.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => alert("Opening sharing options...")} className="bg-white border text-gray-700 border-gray-200 px-4 py-2 font-bold text-sm rounded-xl hover:bg-gray-50 transition shadow-sm flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</button>
                        <button onClick={() => alert("Generating standard PDF export...")} className="bg-indigo-600 text-white px-4 py-2 font-bold text-sm rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export PDF</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                            <Activity className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-500">Resume Strength</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1">Excellent</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-500">Performance Trend</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1">+12%</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                            <FileText className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-500">Weak Areas</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1">2 flags</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                            <Presentation className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-500">Overall Match Avg</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1">78%</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Reports</h2>
                        <button onClick={() => alert("Entering Compare Mode: Select two reports to compare side-by-side.")} className="text-indigo-600 text-sm font-bold hover:underline">Compare Mode</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl font-black text-lg shadow-inner">
                                        8{i}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight">Full Stack Developer Application</h4>
                                        <p className="text-sm text-gray-500 font-medium">Generated March {i}, 2026</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => alert("Previewing report details...")} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm"><Eye className="w-4 h-4 text-gray-600" /></button>
                                    <button onClick={() => alert("Opening email dialog...")} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm"><Mail className="w-4 h-4 text-gray-600" /></button>
                                    <button onClick={() => alert("Downloading individual report...")} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm"><Download className="w-4 h-4 text-gray-600" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
