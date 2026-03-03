import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import logoImage from "../pages/logo.png";
import {
    LayoutDashboard, FileText, Settings, LogOut, History, User,
    Briefcase, BarChart2, Bookmark, Mic, Sparkles, Map, Bell,
    CreditCard, HelpCircle, MessageSquare, ChevronLeft, ChevronRight,
    LineChart, DollarSign, Menu, X
} from "lucide-react";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const sidebarSections = [
        {
            title: "MAIN",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
                { icon: FileText, label: "Resume Analyzer", path: "/resume-analyzer" },
                { icon: Briefcase, label: "Job Match", path: "/job-match" },
                { icon: BarChart2, label: "Skill Gap Analysis", path: "/skill-gap" },
            ]
        },
        {
            title: "MANAGEMENT",
            items: [
                { icon: History, label: "History", path: "/history" },
                { icon: LineChart, label: "Reports", path: "/reports" },
                { icon: Bookmark, label: "Saved Jobs", path: "/saved-jobs" },
            ]
        },
        {
            title: "TOOLS",
            items: [
                { icon: Mic, label: "Interview Prep", path: "/interview-prep" },
                { icon: Sparkles, label: "Resume Rewriter", path: "/resume-rewriter", badge: "PRO", badgeStyle: "bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900" },
                { icon: Map, label: "Career Roadmap", path: "/career-roadmap" },
                { icon: DollarSign, label: "Salary Insights", path: "/salary-insights", badge: "PRO", badgeStyle: "bg-gradient-to-r from-emerald-200 to-emerald-400 text-emerald-900" },
            ]
        },
        {
            title: "ACCOUNT",
            items: [
                { icon: User, label: "Profile", path: "/profile" },
                { icon: Settings, label: "Settings", path: "/settings" },
                { icon: Bell, label: "Notifications", path: "/notifications" },
            ]
        },
        {
            title: "SUPPORT",
            items: [
                { icon: HelpCircle, label: "Help Center", path: "/help-center" },
                { icon: MessageSquare, label: "Feedback", path: "/feedback" },
            ]
        }
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        setIsMobileOpen(false);
    };

    return (
        <>
            {/* Mobile Header Box */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <img src={logoImage} alt="ResumeAI Logo" className="w-8 h-8 object-contain rounded-lg shadow-sm shrink-0" />
                    <span className="text-xl font-bold text-gray-900 truncate">ResumeAI</span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col min-h-screen transition-all duration-300 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isCollapsed ? 'lg:w-20' : 'w-72 lg:w-72'}`}>
                {/* Header / Logo */}
                <div className={`p-6 border-b border-gray-100 flex items-center ${isCollapsed ? 'lg:justify-center px-4' : 'justify-between lg:justify-start lg:gap-3'} relative h-[88px] box-border`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden lg:flex lg:justify-center lg:gap-0' : 'flex'}`}>
                        <img src={logoImage} alt="ResumeAI Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm shrink-0" />
                        {!isCollapsed && <span className="text-xl font-bold text-gray-900 truncate">ResumeAI</span>}
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-colors z-40"
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>

                {/* Navigation Sections */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 py-4">
                    {sidebarSections.map((section, idx) => (
                        <div key={idx} className="mb-6 px-4">
                            {/* Section Title */}
                            {!isCollapsed && (
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
                                    {section.title}
                                </h3>
                            )}
                            {isCollapsed && <div className="h-4"></div>} {/* Spacer for collapsed mode */}

                            {/* Section Items */}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            onClick={(e) => handleLinkClick(e, item.path)}
                                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl transition-all group ${isActive
                                                ? "bg-indigo-50 text-indigo-700 font-bold shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                                }`}
                                            title={isCollapsed ? item.label : undefined}
                                        >
                                            <div className="flex items-center justify-center">
                                                <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} transition-colors ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-500"}`} />
                                                {!isCollapsed && <span className="truncate">{item.label}</span>}
                                            </div>

                                            {/* Badge / Pro Tag */}
                                            {!isCollapsed && item.badge && (
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.badgeStyle}`}>
                                                    {item.badge}
                                                </span>
                                            )}

                                            {/* Notification Dot for collapsed badges */}
                                            {isCollapsed && item.badge && (
                                                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border border-white"></span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer / Sign Out */}
                <div className="p-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start px-4'} w-full py-3 text-sm font-bold text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors group relative`}
                        title={isCollapsed ? "Sign Out" : undefined}
                    >
                        <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} text-gray-400 group-hover:text-red-500 transition-colors`} />
                        {!isCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
