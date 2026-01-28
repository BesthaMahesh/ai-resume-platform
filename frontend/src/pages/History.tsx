import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Loader2, Calendar, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Report {
    _id: string;
    jobDescription: string;
    matchScore: number;
    skills: string[];
    createdAt: string;
}

import { Trash2 } from "lucide-react";

export default function History() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            } else {
                setUser(currentUser);
                fetchHistory(currentUser);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchHistory = async (currentUser: User) => {
        try {
            const token = await currentUser.getIdToken();
            const res = await axios.get("http://localhost:5000/history", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReports(res.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteReport = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this analysis?")) return;

        try {
            const token = await user?.getIdToken();
            await axios.delete(`http://localhost:5000/history/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReports(reports.filter(r => r._id !== id));
        } catch (error) {
            alert("Failed to delete report");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
                    <p className="text-gray-600">View your past resume analyses.</p>
                </header>

                {reports.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="bg-indigo-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No scans yet</h3>
                        <p className="text-gray-500 mt-2 mb-6">Start a new analysis to track your progress.</p>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {reports.map((report) => (
                            <div key={report._id} className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                                        Scan
                                    </div>
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(report.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                                    {report.jobDescription ?
                                        report.jobDescription.slice(0, 60) + (report.jobDescription.length > 60 ? "..." : "")
                                        : "Unknown Job Description"}
                                </h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`text-2xl font-bold ${report.matchScore >= 70 ? "text-green-600" :
                                        report.matchScore >= 40 ? "text-amber-600" : "text-red-600"
                                        }`}>
                                        {report.matchScore}%
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
                                        Match Score
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Top Skills</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {report.skills.slice(0, 3).map((skill, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {skill}
                                            </span>
                                        ))}
                                        {report.skills.length > 3 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                                                +{report.skills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => navigate("/dashboard", { state: { initialReport: report } })}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                    >
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => deleteReport(report._id, e)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}
