import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, updateProfile, updatePassword, User } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import { Loader2, User as UserIcon, Lock, Save, CheckCircle, AlertCircle, Linkedin, Globe, Award, MapPin, Briefcase, Calendar, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            } else {
                setUser(currentUser);
                setDisplayName(currentUser.displayName || "");
                // Load phone from local storage or extended profile
                const savedPhone = localStorage.getItem(`phone_${currentUser.uid}`);
                if (savedPhone) setPhone(savedPhone);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setSubmitting(true);
        try {
            if (user) {
                await updateProfile(user, { displayName });
                localStorage.setItem(`phone_${user.uid}`, phone);
                setMessage({ type: 'success', text: "Profile updated successfully." });
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setSubmitting(true);
        try {
            if (user && newPassword) {
                await updatePassword(user, newPassword);
                setNewPassword("");
                setMessage({ type: 'success', text: "Password updated successfully." });
            }
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                setMessage({ type: 'error', text: "For security, please log out and log back in to change your password." });
            } else {
                setMessage({ type: 'error', text: error.message });
            }
        } finally {
            setSubmitting(false);
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
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account information and security.</p>
                </header>

                <div className="max-w-4xl space-y-8">

                    {/* Profile Completion Meter */}
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            {/* Circular meter */}
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="transparent" />
                                    <circle cx="80" cy="80" r="70" stroke="#a78bfa" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * 0.70)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-extrabold text-white">70%</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">Profile is 70% Complete</h2>
                                <p className="text-indigo-200 text-sm mb-6">Complete your profile to unlock better job matches and AI-driven salary predictions.</p>

                                <div className="flex flex-wrap gap-3">
                                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 border border-white/20 rounded-xl text-sm font-bold">
                                        <Linkedin className="w-4 h-4 text-blue-400" /> Add LinkedIn
                                    </button>
                                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 border border-white/20 rounded-xl text-sm font-bold">
                                        <Globe className="w-4 h-4 text-emerald-400" /> Add Portfolio
                                    </button>
                                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 border border-white/20 rounded-xl text-sm font-bold">
                                        <Award className="w-4 h-4 text-amber-400" /> Add Certifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                            {message.text}
                        </div>
                    )}

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <UserIcon className="h-5 w-5 text-indigo-600" />
                                Personal Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        disabled
                                        value={user?.email || ""}
                                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Display Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Location</label>
                                        <input type="text" placeholder="e.g., San Francisco, CA" className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Briefcase className="w-4 h-4 text-gray-400" /> Preferred Role</label>
                                        <input type="text" placeholder="e.g., Senior Full Stack Developer" className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Experience Level</label>
                                        <select className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition">
                                            <option>Entry Level (0-2 years)</option>
                                            <option>Mid Level (3-5 years)</option>
                                            <option>Senior Level (6+ years)</option>
                                            <option>Director / Executive</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Availability Status</label>
                                        <select className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition text-green-700 font-bold bg-green-50">
                                            <option>Open to Work</option>
                                            <option>Actively Interviewing</option>
                                            <option>Not Looking</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-8">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Resume Timeline Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-indigo-600" />
                                Resume Timeline
                            </h2>
                            <button className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition shadow-sm">+ Add Item</button>
                        </div>
                        <div className="p-6 space-y-8">
                            <div className="relative border-l-2 border-indigo-100 pl-6 space-y-8 ml-3">
                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center"></div>
                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded inline-block mb-1 shadow-sm">Present</span>
                                    <h3 className="font-bold text-lg text-gray-900">Senior Frontend Developer</h3>
                                    <p className="font-bold text-gray-600 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> TechNova Inc. • Remote</p>
                                    <p className="text-sm text-gray-500 mt-2 font-medium">Lead developer on the core React application processing 2M+ active users.</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 w-5 h-5 bg-gray-300 rounded-full border-4 border-white shadow-sm"></div>
                                    <span className="text-xs font-black text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded inline-block mb-1 shadow-sm">2020 - 2023</span>
                                    <h3 className="font-bold text-lg text-gray-900">React Developer</h3>
                                    <p className="font-bold text-gray-600">WebSphere Solutions • New York, NY</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[35px] top-1 w-5 h-5 bg-indigo-400 rounded-full border-4 border-white shadow-shadow flex items-center justify-center"><GraduationCap className="w-3 h-3 text-white" /></div>
                                    <span className="text-xs font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded inline-block mb-1 shadow-sm">Education</span>
                                    <h3 className="font-bold text-lg text-gray-900">B.S. Computer Science</h3>
                                    <p className="font-bold text-gray-600">Stanford University</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-indigo-600" />
                                Security
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdatePassword} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={submitting || !newPassword}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition"
                                    >
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
