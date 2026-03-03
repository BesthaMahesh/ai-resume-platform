import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Briefcase, FileText, CheckCircle2, TrendingUp, Sparkles, Filter } from "lucide-react";

export default function Notifications() {
    const notifications = [
        { id: 1, type: 'success', icon: FileText, title: 'Resume Analysis Completed', desc: 'Your Match Score for "Frontend Developer" role is ready.', time: '2 mins ago', unread: true },
        { id: 2, type: 'info', icon: Briefcase, title: 'New Job Match Found', desc: 'A new role similar to your skills has been suggested in the Dashboard.', time: '1 hour ago', unread: true },
        { id: 3, type: 'warning', icon: TrendingUp, title: 'Salary Update Alert', desc: 'Market average for React Developers has increased by 5%.', time: '5 hours ago', unread: false },
        { id: 4, type: 'pro', icon: Sparkles, title: 'Interview Prep Reminder', desc: 'Check out the mock interview questions derived from your last scan.', time: '1 day ago', unread: false },
        { id: 5, type: 'info', icon: CheckCircle2, title: 'Profile Incomplete Reminder', desc: 'Complete your profile to unlock better AI recommendations.', time: '2 days ago', unread: false },
    ];

    const getIconColor = (type: string) => {
        switch (type) {
            case 'success': return 'text-green-600 bg-green-50';
            case 'info': return 'text-blue-600 bg-blue-50';
            case 'warning': return 'text-amber-600 bg-amber-50';
            case 'pro': return 'text-purple-600 bg-purple-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 flex justify-between items-end border-b pb-6 border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
                        <p className="text-gray-600 font-medium">Stay updated with your career progress.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition">
                            Mark all as read
                        </button>
                    </div>
                </header>

                <div className="max-w-4xl space-y-4">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 border ${notif.unread ? 'bg-white shadow-sm border-gray-200' : 'bg-transparent border-transparent'}`}>
                            <div className={`p-3 rounded-xl shrink-0 ${getIconColor(notif.type)}`}>
                                <notif.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{notif.time}</span>
                                </div>
                                <p className={`text-sm ${notif.unread ? 'text-gray-600 font-medium' : 'text-gray-500'}`}>
                                    {notif.desc}
                                </p>
                            </div>
                            {notif.unread && (
                                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full mt-2 shrink-0 shadow-sm"></div>
                            )}
                        </div>
                    ))}

                    <button className="w-full mt-8 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition">View Notification History</button>
                </div>
            </div>
        </div>
    );
}
