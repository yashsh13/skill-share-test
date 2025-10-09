import { useState, useEffect } from 'react';
import { ArrowRight, Users, MessageCircle, Sparkles, Zap, Globe2, Heart, Star, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const navigate = useNavigate();
 
  const navigateToRegister = () => navigate('/register');
  const navigateToLogin = () => navigate('/login');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate floating hearts and sparkles
    const hearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'star' : 'sparkle'
    }));
    setFloatingHearts(hearts);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const friendlyIcons = [
    { icon: <Heart className="w-10 h-10" />, color: 'text-pink-400' },
    { icon: <Smile className="w-10 h-10" />, color: 'text-yellow-400' },
    { icon: <Sparkles className="w-10 h-10" />, color: 'text-violet-400' },
    { icon: <Star className="w-10 h-10" />, color: 'text-blue-400' },
    { icon: <MessageCircle className="w-10 h-10" />, color: 'text-emerald-400' },
    { icon: <Globe2 className="w-10 h-10" />, color: 'text-indigo-400' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      
      {/* Floating Bubbles Background */}
      {floatingHearts.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-bounce ${
            item.type === 'heart' ? 'text-pink-300' : 
            item.type === 'star' ? 'text-yellow-300' : 
            'text-violet-300'
          }`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: 0.4
          }}
        >
          {item.type === 'heart' ? '💗' : item.type === 'star' ? '⭐' : '✨'}
        </div>
      ))}
      
      {/* Soft Mouse Trail */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-200/40 via-violet-200/40 to-pink-200/40 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`
        }}
      />

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        
        {/* Floating Friendly Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {friendlyIcons.map((item, index) => (
            <div
              key={index}
              className={`absolute ${item.color} animate-bounce opacity-20`}
              style={{
                left: `${10 + index * 15}%`,
                top: `${15 + (index % 3) * 25}%`,
                animationDuration: `${3 + index * 0.7}s`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div 
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
          }`}
        >
          {/* Cute Bouncing Logo */}
          <div className="mb-10 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-2xl opacity-60 animate-ping" 
                   style={{ animationDuration: '3s' }} />
              <div className="relative w-28 h-28 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl shadow-violet-300/50 animate-bounce border-4 border-white">
                <MessageCircle className="w-14 h-14 text-white" />
              </div>
              {/* Orbiting Hearts */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">💖</div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">✨</div>
              </div>
            </div>
          </div>

          {/* Cheerful Heading */}
          <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse drop-shadow-lg">
              Share
            </span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 drop-shadow-lg transform hover:scale-110 transition-transform duration-500">
              Skills
            </span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 text-5xl animate-pulse drop-shadow-lg">
            Meet Amazing Friends
            </span>
          </h1>

          {/* Friendly Subtitle */}
          <div className="mb-12 space-y-3">
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
              Connect with wonderful strangers 🌟
            </p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Share your passions, learn together, and make genuine connections in a safe, friendly space
            </p>
          </div>

          {/* Playful CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button onClick={navigateToRegister} className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-2xl shadow-violet-400/50 hover:shadow-violet-500/70 hover:scale-110 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center space-x-3">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Start Connecting</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button onClick={navigateToLogin} className="group px-12 py-6 bg-white text-violet-600 rounded-full font-bold text-xl shadow-2xl shadow-blue-300/50 hover:shadow-blue-400/70 hover:scale-110 transition-all duration-300 border-4 border-violet-200 hover:border-violet-300">
              <span className="flex items-center space-x-2">
                <Heart className="w-6 h-6 group-hover:fill-pink-400 group-hover:text-pink-400 transition-colors" />
                <span> Already Registered </span>
              </span>
            </button>
          </div>

          {/* Happy Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: 'Meet Strangers', label: 'share skills', icon: <Smile className="w-10 h-10" />, gradient: 'from-yellow-400 to-orange-400' },
              { number: 'Get Coins', label: 'win coupons', icon: <Globe2 className="w-10 h-10" />, gradient: 'from-blue-400 to-cyan-400' },
              { number: 'Use Skills', label: 'spread happiness', icon: <Heart className="w-10 h-10" />, gradient: 'from-pink-400 to-rose-400' },
              { number: 'Connect', label: 'with amzing peoples', icon: <Sparkles className="w-10 h-10" />, gradient: 'from-violet-400 to-purple-400' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-lg border-4 border-violet-100 rounded-3xl p-8 hover:bg-white hover:scale-110 hover:-rotate-2 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient} mb-3 flex justify-center group-hover:scale-125 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-semibold">{stat.label}</div>
                </div>
                {/* Floating particles on hover */}
                <div className="absolute -top-2 -right-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  ✨
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 inline-flex items-center space-x-3 bg-white/80 backdrop-blur-lg px-8 py-4 rounded-full shadow-xl border-2 border-violet-100">
            <Shield className="w-6 h-6 text-emerald-500" />
            <span className="text-gray-700 font-semibold">Safe & Friendly Community</span>
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Cute Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-12 border-4 border-violet-300 rounded-full flex justify-center pt-2">
              <div className="w-2 h-4 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full animate-pulse" />
            </div>
            <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Cheerful Bottom Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z" fill="rgba(167, 139, 250, 0.3)" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <path d="M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z" fill="rgba(147, 197, 253, 0.3)" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <path d="M0,90 Q300,50 600,90 T1200,90 L1200,120 L0,120 Z" fill="rgba(251, 207, 232, 0.3)" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </svg>
      </div>
    </div>
  );
}

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);