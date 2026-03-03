import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { CheckCircle, CreditCard, Download, Zap, Shield, Sparkles } from "lucide-react";

export default function Billing() {
    const [plan] = useState("Free");

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 pt-24 lg:p-8 transition-all duration-300">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
                    <p className="text-gray-600 mb-6">Manage your plan, payments, and invoices.</p>
                </header>

                <div className="max-w-5xl space-y-8">
                    {/* Current Plan Overview */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Current Plan</div>
                            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                                Free Tier <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-bold">Active</span>
                            </h2>
                            <p className="text-gray-500 mt-2">You have 2 resume analyses left this month.</p>

                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 mb-2">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                            <div className="text-xs font-bold text-gray-500">1 / 3 Analyses Used</div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <button className="bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 font-black px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition flex justify-center items-center gap-2">
                                <CrownIcon className="w-5 h-5" /> Upgrade to Pro
                            </button>
                            <button className="text-gray-500 font-bold hover:text-gray-800 transition py-2 text-sm text-center">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>

                    {/* Compare Plans Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Compare Plans</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-2">Free</h3>
                                <div className="text-3xl font-black mb-6">₹0<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                                <ul className="space-y-4">
                                    {['3 Resume Analyses/month', 'Basic Match Scores', 'Standard Templates'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-gray-400" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-8 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl cursor-not-allowed">Current Plan</button>
                            </div>

                            <div className="p-8 relative bg-gradient-to-b from-amber-50/50 to-transparent">
                                <div className="absolute top-0 right-0 bg-amber-200 text-amber-900 text-xs font-black px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wider">RECOMMENDED</div>
                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Pro <Sparkles className="w-4 h-4 text-amber-500" /></h3>
                                <div className="text-3xl font-black mb-6">₹999<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                                <ul className="space-y-4">
                                    {['Unlimited Resume Analyses', 'AI Resume Rewriter', 'Salary Insights Dashboard', 'Advanced Interview Prep'].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-800">
                                            <CheckCircle className="w-5 h-5 text-amber-500" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-md hover:shadow-lg">Upgrade Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Invoices & Payment Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CreditCard className="w-5 h-5 text-indigo-500" /> Payment Methods</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-4">No payment methods saved.</p>
                                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg transition">+ Add Payment Method</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Download className="w-5 h-5 text-indigo-500" /> Billing History</h2>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500">No past invoices available.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CrownIcon({ className }: { className: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z"></path></svg>;
}
