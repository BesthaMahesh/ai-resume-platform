import Sidebar from "../components/Sidebar";
import { Star, MessageSquare, ArrowUp, CheckCircle } from "lucide-react";

export default function Feedback() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Feedback & Feature Requests</h1>
                    <p className="text-gray-600 font-medium">Help us build the perfect resume tool for you.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Submit Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Submit Feedback</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500">
                                    <option>Feature Request</option>
                                    <option>Bug Report</option>
                                    <option>General Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} type="button" onClick={() => alert(`Rated ${star} stars!`)} className="p-2 border border-gray-200 rounded-lg hover:bg-amber-50 group">
                                            <Star className="w-6 h-6 text-gray-300 group-hover:text-amber-400 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea rows={5} placeholder="Tell us what you love or what we can improve..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 resize-none text-sm font-medium"></textarea>
                            </div>

                            <button type="button" onClick={() => alert("Thank you! Feedback submitted successfully.")} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex justify-center items-center shadow-md">
                                Submit Feedback
                            </button>
                        </form>
                    </div>

                    {/* Voting Board */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                            Community Board
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-black">Top Voted</span>
                        </h2>

                        <div className="space-y-4 flex-1">
                            {[
                                { title: 'Add dark mode toggle to PDF exports', votes: 412, status: 'In Progress' },
                                { title: 'LinkedIn Profile Importer Sync', votes: 389, status: 'Under Review' },
                                { title: 'Integrate with Greenhouse ATS', votes: 204, status: 'Planned' }
                            ].map((req, i) => (
                                <div key={i} className="p-4 border border-gray-100 rounded-xl flex items-start gap-4 hover:shadow-sm transition">
                                    <button onClick={() => alert("Upvoted feature request!")} className="flex flex-col items-center p-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 text-indigo-600 transition min-w-[3rem]">
                                        <ArrowUp className="w-5 h-5" />
                                        <span className="font-black text-sm">{req.votes}</span>
                                    </button>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{req.title}</h4>
                                        <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{req.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
