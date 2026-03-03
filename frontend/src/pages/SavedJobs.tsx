import Sidebar from "../components/Sidebar";
import { Bookmark, Building, Calendar, MapPin, ExternalLink, MoreVertical, Filter } from "lucide-react";

export default function SavedJobs() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Saved Jobs & Tracker</h1>
                        <p className="text-gray-600 font-medium">Keep track of roles you've applied to and upcoming interviews.</p>
                    </div>
                    <button onClick={() => alert("Opening sort & filter menu...")} className="bg-white border text-gray-700 border-gray-200 px-4 py-2 font-bold text-sm rounded-xl hover:bg-gray-50 transition shadow-sm flex items-center gap-2"><Filter className="w-4 h-4" /> Sort & Filter</button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Frontend Engineer', corp: 'Google', match: 92, status: 'Interview', note: 'Technical screen next Tuesday.', color: 'border-yellow-200 bg-yellow-50 text-yellow-700' },
                        { title: 'React Developer', corp: 'Spotify', match: 88, status: 'Applied', note: 'Sent via referral link.', color: 'border-blue-200 bg-blue-50 text-blue-700' },
                        { title: 'Senior Web Dev', corp: 'Vercel', match: 75, status: 'Saved', note: 'Need to research Next 15 features before applying.', color: 'border-gray-200 bg-gray-100 text-gray-700' },
                        { title: 'UI Engineer', corp: 'Figma', match: 95, status: 'Rejected', note: 'Not enough graphic design XP.', color: 'border-red-200 bg-red-50 text-red-700' },
                    ].map((job, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-black text-gray-400 border border-gray-200">
                                            {job.corp[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{job.title}</h3>
                                            <p className="text-xs font-bold text-gray-500 flex items-center gap-1"><Building className="w-3 h-3" /> {job.corp}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => alert("Opening job options menu (Edit, Delete, Update Status)...")} className="text-gray-400 hover:text-gray-900"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-bold">
                                    <span className={`px-2 py-1 rounded border uppercase tracking-wider ${job.color}`}>{job.status}</span>
                                    <span className="text-gray-500 flex items-center gap-1"><Calendar className="w-4 h-4" /> Added Mar 1</span>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50/50 text-sm font-medium text-gray-600 border-t border-gray-100">
                                <p className="line-clamp-2"><strong>Note:</strong> {job.note}</p>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-100 mt-auto flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Match Score</span>
                                    <span className="text-lg font-black text-indigo-600">{job.match}%</span>
                                </div>
                                <button onClick={() => alert("Redirecting to job application page...")} className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:underline">Apply Link <ExternalLink className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
