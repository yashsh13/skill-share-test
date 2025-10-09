import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Heart, Sparkles, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    skills: []
  });

  const navigate = useNavigate();

  const availableSkills = [
    "web development",
    "mechanical",
    "cooking",
    "coding",
    "art",
    "education",
    "electronics",
    "gaming",
    "sports"
  ];

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'star' : i % 4 === 2 ? 'sparkle' : 'smile'
    }));
    setFloatingElements(elements);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/user/register',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!data?.success) {
        console.error('Registration failed:', data);
        alert(data?.message || 'Registration failed');
        return;
      }

      console.log('Registration success:', data);
      
      alert(data?.message || 'Registered successfully!');
      navigate('/home');
    } catch (error) {
      const message = error?.response?.data?.message || error.message || 'Network error. Please try again.';
      console.error('Registration error:', error);
      alert(message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      
      {floatingElements.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-bounce ${
            item.type === 'heart' ? 'text-pink-300' : 
            item.type === 'star' ? 'text-yellow-300' : 
            item.type === 'smile' ? 'text-blue-300' :
            'text-violet-300'
          }`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: 0.3
          }}
        >
          {item.type === 'heart' ? '💗' : 
           item.type === 'star' ? '⭐' : 
           item.type === 'smile' ? '😊' : '✨'}
        </div>
      ))}
      
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/40 via-violet-200/40 to-pink-200/40 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`
        }}
      />

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        
        <div 
          className={`w-full max-w-md transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-2xl opacity-60 animate-ping" 
                     style={{ animationDuration: '3s' }} />
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl shadow-violet-300/50 animate-bounce border-4 border-white">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xl">💖</div>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-black mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                Join Us Today!
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Start your amazing journey with us ✨
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border-4 border-violet-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-violet-400 group-hover:text-violet-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full pl-12 pr-4 py-4 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-violet-400 group-hover:text-violet-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-violet-400 group-hover:text-violet-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-violet-400 hover:text-violet-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-sm">
                  Select Your Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        formData.skills.includes(skill)
                          ? 'bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white shadow-lg scale-105'
                          : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-2 border-violet-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {skill}
                        {formData.skills.includes(skill) && (
                          <X className="w-3 h-3" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <p className="text-sm text-violet-600 mt-2 font-medium">
                    ✨ {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-violet-400/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Heart className="w-6 h-6 group-hover:fill-white transition-all" />
                  <span>Create Account</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-violet-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-violet-200 rounded-xl hover:border-violet-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-gray-700">Google</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-violet-200 rounded-xl hover:border-violet-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-semibold text-gray-700">Facebook</span>
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-violet-600 hover:text-violet-700 font-bold hover:underline transition-all">
                Login here! 🎉
              </a>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border-2 border-violet-100">
              <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
              <span className="text-gray-700 font-semibold text-sm">Safe & Secure Registration</span>
              <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(167, 139, 250, 0.3)" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <path d="M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z" fill="rgba(147, 197, 253, 0.3)" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <path d="M0,90 Q300,50 600,90 T1200,90 L1200,120 L0,120 Z" fill="rgba(251, 207, 232, 0.3)" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </svg>
      </div>
    </div>
  );
}