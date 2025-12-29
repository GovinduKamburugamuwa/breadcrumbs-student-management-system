// pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, GraduationCap, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import loginbackground from '../assets/login-bg.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/students');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background with stats (3/4) */}
      <div className="hidden lg:flex lg:w-3/4 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 bg-cover bg-center bg-no-repeat blur-sm scale-110"
          style={{ 
            backgroundImage: loginbackground ? `url(${loginbackground})` : 'none',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 py-16">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="inline-block p-6 bg-white/20 rounded-3xl shadow-2xl backdrop-blur-sm">
              <GraduationCap size={64} className="text-white" />
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="bg-black/60 backdrop-blur-md rounded-3xl p-12 mb-12 shadow-2xl border border-white/30 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center leading-tight">
              Welcome to Student Management System
            </h1>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-white">100%</div>
              <div className="text-sm text-white/80">Secure</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-white">24/7</div>
              <div className="text-sm text-white/80">Access</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-white">Fast</div>
              <div className="text-sm text-white/80">Performance</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition">
              <div className="text-3xl md:text-4xl font-bold mb-1 text-white">Easy</div>
              <div className="text-sm text-white/80">To Use</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form (1/4) */}
      <div className="w-full lg:w-1/4 flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-sm w-full">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-block p-5 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
              <GraduationCap size={48} className="text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2 text-center">Welcome Back</h2>
            <p className="text-gray-600 text-center">Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
