import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import JobMatch from './pages/JobMatch';
import SkillGap from './pages/SkillGap';
import Reports from './pages/Reports';
import SavedJobs from './pages/SavedJobs';
import InterviewPrep from './pages/InterviewPrep';
import ResumeRewriter from './pages/ResumeRewriter';
import CareerRoadmap from './pages/CareerRoadmap';
import SalaryInsights from './pages/SalaryInsights';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume-analyzer" element={<Dashboard />} />
                <Route path="/job-match" element={<JobMatch />} />
                <Route path="/skill-gap" element={<SkillGap />} />

                <Route path="/history" element={<History />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />

                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/resume-rewriter" element={<ResumeRewriter />} />
                <Route path="/career-roadmap" element={<CareerRoadmap />} />
                <Route path="/salary-insights" element={<SalaryInsights />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />

                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/feedback" element={<Feedback />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
