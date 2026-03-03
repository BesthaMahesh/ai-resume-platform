import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { User, Mail, Lock, Smartphone, Save, Moon, Sun, Monitor, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Settings() {
    const [theme, setTheme] = useState("system");

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8 border-b pb-6 border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
                    <p className="text-gray-600 font-medium">Manage your security and preferences.</p>
                </header>

                <div className="max-w-4xl space-y-8">

                    {/* Security & Authentication */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-green-500" />
                            <h2 className="text-lg font-bold text-gray-800">Security & Authentication</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                <div>
                                    <p className="font-bold text-gray-800 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500" /> Email Address</p>
                                    <p className="text-sm text-gray-500 mt-1">Your current email is linked to your Google Account.</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-200 font-bold text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition">Change Email</button>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                <div>
                                    <p className="font-bold text-gray-800 flex items-center gap-2"><Lock className="w-4 h-4 text-gray-500" /> Password</p>
                                    <p className="text-sm text-gray-500 mt-1">Secure your account with a strong password.</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-200 font-bold text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition">Update Password</button>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
                                <div>
                                    <p className="font-bold text-gray-800 flex items-center gap-2"><Smartphone className="w-4 h-4 text-indigo-500" /> Two-Factor Authentication</p>
                                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                                </div>
                                <button className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 transition shadow-sm">Enable 2FA</button>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <Monitor className="w-6 h-6 text-blue-500" />
                            <h2 className="text-lg font-bold text-gray-800">App Preferences</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Theme Preference</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setTheme("light")}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 font-bold text-sm transition ${theme === 'light' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <Sun className="w-5 h-5" /> Light
                                    </button>
                                    <button
                                        onClick={() => setTheme("dark")}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 font-bold text-sm transition ${theme === 'dark' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <Moon className="w-5 h-5" /> Dark
                                    </button>
                                    <button
                                        onClick={() => setTheme("system")}
                                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 font-bold text-sm transition ${theme === 'system' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <Monitor className="w-5 h-5" /> System
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">AI Strictness Level</label>
                                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                                    <option>Lenient (Encouraging)</option>
                                    <option>Standard (Balanced)</option>
                                    <option>Strict (FAANG-level critique)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h2 className="text-lg font-bold text-gray-800">Danger Zone</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                        <button className="px-4 py-2 bg-red-50 text-red-600 font-bold text-sm rounded-lg hover:bg-red-100 transition border border-red-100">Delete Account</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
