// pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, ArrowRight, FileSpreadsheet, Zap } from 'lucide-react';
import backgroundImage from '../assets/home-page-bg.jpg';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="h-screen w-screen relative overflow-hidden flex flex-col">
            {/* Background Image with gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-cover bg-center bg-no-repeat blur-sm scale-110"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                }}
            />

            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Main Content - Centered Hero */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
                <div className="text-center text-white w-full max-w-7xl mx-auto flex flex-col justify-center">
                    {/* Logo/Icon */}
                    <div className="mb-4">
                        <div className="inline-block p-4 bg-white/20 rounded-2xl shadow-2xl backdrop-blur-sm">
                            <GraduationCap size={48} className="text-white" />
                        </div>
                    </div>

                    {/* Main Heading with Background */}
                    <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-2xl border border-white/30 max-w-4xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-wide">
                            STUDENT MANAGEMENT SYSTEM
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm md:text-base lg:text-lg opacity-95 font-light max-w-2xl mx-auto leading-relaxed">
                            Streamline your educational administration with powerful tools for managing student records, tracking performance, and generating insights.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
                        {user ? (
                            <Link
                                to="/students"
                                className="inline-flex items-center gap-2 bg-black/70 hover:bg-black/80 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-base border border-white/20 hover:border-white/30"
                            >
                                <span>Go to Dashboard</span>
                                <ArrowRight size={18} />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 bg-black/70 hover:bg-black/80 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl text-base border border-white/20 hover:border-white/30"
                                >
                                    <span>Get Started Free</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-xl hover:shadow-2xl transition border border-white/20 hover:bg-white/15">
                            <div className="inline-block p-3 bg-white/20 rounded-lg mb-3 shadow-lg backdrop-blur-sm">
                                <Users size={24} className="text-white" />
                            </div>
                            <h3 className="text-base font-bold mb-2 text-white">Student Records</h3>
                            <p className="text-white/80 leading-relaxed text-sm">Comprehensive database for managing student information, enrollment details, and academic records.</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-xl hover:shadow-2xl transition border border-white/20 hover:bg-white/15">
                            <div className="inline-block p-3 bg-white/20 rounded-lg mb-3 shadow-lg backdrop-blur-sm">
                                <Zap size={24} className="text-white" />
                            </div>
                            <h3 className="text-base font-bold mb-2 text-white">Quick Access</h3>
                            <p className="text-white/80 leading-relaxed text-sm">Lightning-fast search and filtering capabilities to find and update student details within seconds.</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 shadow-xl hover:shadow-2xl transition border border-white/20 hover:bg-white/15">
                            <div className="inline-block p-3 bg-white/20 rounded-lg mb-3 shadow-lg backdrop-blur-sm">
                                <FileSpreadsheet size={24} className="text-white" />
                            </div>
                            <h3 className="text-base font-bold mb-2 text-white">Export Data</h3>
                            <p className="text-white/80 leading-relaxed text-sm">Flexible export options to CSV and PDF formats for reporting, analysis, and sharing data.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;