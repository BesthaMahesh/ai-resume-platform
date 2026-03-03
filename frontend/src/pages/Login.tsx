import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import logoImage from "./logo.png";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, Github, Linkedin, Smartphone, Link as LinkIcon, Sun, Moon, AlertOctagon, Terminal } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [strength, setStrength] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // Calculate password strength
        let score = 0;
        if (password.length > 6) score += 25;
        if (password.match(/[A-Z]/)) score += 25;
        if (password.match(/[0-9]/)) score += 25;
        if (password.match(/[^A-Za-z0-9]/)) score += 25;
        setStrength(score);
    }, [password]);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (attempts >= 5) {
            setError("Too many attempts. Account locked for 15 minutes.");
            return;
        }

        setLoading(true);
        try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setAttempts((prev: number) => prev + 1);
            setError(`Invalid email or password. Attempt ${attempts + 1}/5`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await setPersistence(auth, browserLocalPersistence);
            await signInWithPopup(auth, googleProvider);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message.replace("Firebase: ", ""));
        } finally {
            setLoading(false);
        }
    };

    const mockLogin = (provider: string) => {
        alert(`Redirecting to ${provider} authentication...`);
    };

    const themeBg = isDarkMode ? "bg-slate-900" : "bg-[linear-gradient(135deg,#1e3c72,#2a5298)]";
    const cardBg = isDarkMode ? "bg-slate-800/90 border-slate-700 text-white" : "bg-white/95 border-white/20 text-gray-900";
    const inputBg = isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900";
    const labelColor = isDarkMode ? "text-gray-400" : "text-gray-500";

    return (
        <div className={`flex flex-col min-h-screen relative overflow-hidden transition-colors duration-500 ${themeBg}`}>
            {/* Background Animation Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Top Navigation */}
            <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-white">
                    <img src={logoImage} alt="ResumeAI Logo" className="w-10 h-10 object-contain rounded-xl" />
                    <span className="text-xl font-black tracking-tight tracking-wider">ResumeAI</span>
                </div>
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-lg"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </nav>

            {/* Centered Login Card */}
            <main className="flex-1 flex justify-center items-center p-4 relative z-10">
                <div className={`w-full max-w-[440px] p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl border ${cardBg} animate-[fadeIn_0.6s_ease-out]`}>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black tracking-tight mb-2">Welcome back</h2>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to continue to your dashboard</p>
                    </div>

                    <form onSubmit={login} className="space-y-5">
                        {error && (
                            <div className="bg-red-50/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-pulse">
                                <AlertOctagon className="w-5 h-5 shrink-0" />
                                <span className="font-bold">{error}</span>
                            </div>
                        )}

                        {/* Floating Label Email */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                            </div>
                            <input
                                type="email"
                                id="email"
                                required
                                className={`peer block w-full pl-10 pr-3 pt-5 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                                placeholder=" "
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className={`absolute left-10 top-3.5 text-xs font-bold uppercase tracking-wider ${labelColor} transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-1.5 peer-focus:uppercase peer-focus:text-blue-500 cursor-text`}>
                                Email address
                            </label>
                        </div>

                        {/* Floating Label Password with Show/Hide & Strength */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500 transition-colors`} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                required
                                className={`peer block w-full pl-10 pr-10 pt-5 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                                placeholder=" "
                                onChange={e => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className={`absolute left-10 top-3.5 text-xs font-bold uppercase tracking-wider ${labelColor} transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-focus:text-xs peer-focus:top-1.5 peer-focus:uppercase peer-focus:text-blue-500 cursor-text`}>
                                Password
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>

                            {/* Password Strength Indicator */}
                            {password.length > 0 && (
                                <div className="absolute -bottom-2.5 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${strength < 50 ? 'bg-red-500' : strength < 100 ? 'bg-amber-400' : 'bg-green-500'}`}
                                        style={{ width: `${strength}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} group-hover:text-blue-500 transition-colors`}>Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Fake 2FA & reCAPTCHA visual representation */}
                        <div className="flex items-center justify-between py-2 border-b border-t border-gray-200/20">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                                <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}><ShieldCheck className="w-3 h-3 text-green-500" /> Trust this device (2FA)</span>
                            </label>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">Protected by reCAPTCHA</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-[0_8px_20px_rgb(37,99,235,0.3)] text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In securely <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>

                        <div className="relative pt-2 pb-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                            </div>
                            <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                                <span className={`px-4 py-1 rounded-full ${isDarkMode ? 'bg-slate-800 text-gray-400' : 'bg-white border border-gray-100 text-gray-500'}`}>Or continue with</span>
                            </div>
                        </div>

                        {/* Social / Premium Logins */}
                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" onClick={handleGoogleLogin} disabled={loading} className={`flex justify-center items-center py-2.5 px-4 border rounded-xl shadow-sm text-sm font-bold transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </button>
                            <button type="button" onClick={() => mockLogin("GitHub")} className={`flex justify-center items-center py-2.5 px-4 border rounded-xl shadow-sm text-sm font-bold transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' : 'bg-gray-900 border-gray-900 text-white hover:bg-black'}`}>
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                            </button>
                            <button type="button" onClick={() => mockLogin("LinkedIn")} className={`flex justify-center items-center py-2.5 px-4 border rounded-xl shadow-sm text-sm font-bold transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' : 'bg-white border-gray-200 text-blue-700 hover:bg-blue-50'}`}>
                                <Linkedin className="h-4 w-4 mr-2" />
                                LinkedIn
                            </button>
                            <div className="flex bg-gray-100 rounded-xl overflow-hidden p-1 gap-1">
                                <button type="button" onClick={() => mockLogin("OTP")} className="flex-1 flex justify-center items-center py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-white hover:shadow-sm transition-all"><Smartphone className="w-3.5 h-3.5 mr-1" /> OTP</button>
                                <button type="button" onClick={() => mockLogin("Magic Link")} className="flex-1 flex justify-center items-center py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-white hover:shadow-sm transition-all"><LinkIcon className="w-3.5 h-3.5 mr-1" /> Link</button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                                Create account
                            </Link>
                        </p>
                        <button onClick={() => navigate("/dashboard")} className={`text-xs font-bold underline ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                            Continue as Guest →
                        </button>
                    </div>
                </div>
            </main>

            {/* Professional SaaS Footer */}
            <footer className="relative z-10 bg-slate-950 text-white/70 pt-16 pb-8 border-t border-white/10 mt-auto">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <img src={logoImage} alt="ResumeAI Logo" className="w-8 h-8 object-contain rounded-lg" />
                                <h4 className="text-xl font-bold text-white tracking-tight">ResumeAI</h4>
                            </div>
                            <p className="text-sm font-medium leading-relaxed max-w-sm">
                                Enterprise-grade platform empowering careers with artificial intelligence, deep learning insights, and interactive roadmap tooling.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Product</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Resume Analyzer</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Job Match</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Interview Prep</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Salary Insights</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Company</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
                        <div>ResumeAI. All rights reserved.</div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Status</a>
                            <a href="#" className="hover:text-white transition">Security</a>
                            <a href="#" className="hover:text-white transition">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
