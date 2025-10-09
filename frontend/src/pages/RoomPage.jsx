import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Heart, Sparkles } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn, Send } from 'lucide-react';

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myCoin, setMyCoin] = useState(0);
  
    useEffect(() => {
      let isMounted = true;
      async function checkLogin() {
        try {
          const { data } = await axios.post(
            'http://localhost:3001/api/user/me',
            {},
            { withCredentials: true }
          );
          if (!isMounted) return;
          if (data?.success) {
            setIsLoggedIn(true);
            // Optionally fetch profile if provided elsewhere
            setUser(data?.user || null);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } catch {
          if (!isMounted) return;
          setIsLoggedIn(false);
          setUser(null);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
      checkLogin();
  
      async function fetchCoin() {
        try {
          const { data } = await axios.post(
            'http://localhost:3001/api/user/mycoins',
            {},
            { withCredentials: true }
          );
          if (data?.success) {
            setMyCoin(data?.coins || 0);
          }
        } catch {
          console("cant fetch your coins");
        }
      }
      fetchCoin();
    }, []);
  
    const logout = () => {
      // Call backend logout then clear local state
      axios.post('http://localhost:3001/api/user/logout', {}, { withCredentials: true })
        .catch(() => {})
        .finally(() => {
          setIsLoggedIn(false);
          setUser(null);
        });
    };
  
    return { isLoggedIn, user, logout, loading , myCoin};
  }
  
  // Header Component
  function Header({ isLoggedIn, onLogout ,myCoin}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <header className="relative z-50">
        <div className="bg-white/80 backdrop-blur-lg border-b-4 border-violet-100 shadow-xl shadow-violet-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-800">Share Skill</h1>
              </div>
  
              <div className="flex items-center space-x-3">
                <button className="hidden md:flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-white border-2 border-violet-200 rounded-full hover:border-violet-400 hover:scale-105 transition-all shadow-lg hover:shadow-xl group">
                  <MessageCircle className="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
                  <a href="/join-room"><span className="hidden md:block ml-2 font-semibold text-gray-700">Room</span></a>
                </button>
  
                <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                  <Coins className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                  <span className="hidden md:block ml-2 font-bold text-white">{myCoin}</span>
                </button>
  
                <button className="relative flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                  <Bell className="w-5 h-5 text-white group-hover:animate-bounce" />
                  <a href="/notifications"><span className="hidden md:block ml-2 font-bold text-white">Notifications</span></a>
                  <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>
  
                <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                  <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <a href="/profile"><span className="hidden md:block ml-2 font-bold text-white">Profile</span></a>
                </button>
  
                {isLoggedIn ? (
                  <button 
                    onClick={onLogout}
                    className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-pink-400 to-red-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white"
                  >
                    <LogOut className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    <span className="hidden md:block ml-2 font-bold text-white">Logout</span>
                  </button>
                ) : (
                  <a href="/login" className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                    <LogIn className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    <span className="hidden md:block ml-2 font-bold text-white">Login</span>
                  </a>
                )}
  
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-700 hover:bg-violet-50 rounded-lg transition-all"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
  
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 transition-all font-semibold">
                  <MessageCircle className="w-5 h-5 text-violet-600" />
                  <span>Room</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 transition-all font-semibold">
                  <Coins className="w-5 h-5 text-orange-500" />
                  <span>Coins</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 transition-all font-semibold">
                  <Bell className="w-5 h-5 text-violet-600" />
                  <span>Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 transition-all font-semibold">
                  <User className="w-5 h-5 text-pink-600" />
                  <span>Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400"></div>
      </header>
    );
  }
  
  // Footer Component
  function Footer() {
    return (
      <footer className="relative mt-auto">
        <div className="relative h-24 overflow-hidden">
          <svg className="absolute top-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 Q300,10 600,50 T1200,50 L1200,0 L0,0 Z" fill="rgba(167, 139, 250, 0.3)" className="animate-pulse" style={{ animationDuration: '4s' }} />
            <path d="M0,70 Q300,110 600,70 T1200,70 L1200,0 L0,0 Z" fill="rgba(147, 197, 253, 0.3)" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <path d="M0,90 Q300,50 600,90 T1200,90 L1200,0 L0,0 Z" fill="rgba(251, 207, 232, 0.3)" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </svg>
        </div>
  
        <div className="bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 border-t-4 border-violet-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-xl opacity-60" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                    ConnectHub
                  </h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Building meaningful connections and fostering collaboration in a vibrant community. Join us today! ✨
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-violet-400 to-violet-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
  
              <div>
                <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <span>Quick Links</span>
                </h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">About Us</a></li>
                  <li><a href="/features" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Features</a></li>
                  <li><a href="/pricing" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Pricing</a></li>
                  <li><a href="/blog" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Blog</a></li>
                  <li><a href="/careers" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Careers</a></li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span>Support</span>
                </h3>
                <ul className="space-y-2">
                  <li><a href="/help" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Help Center</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Contact Us</a></li>
                  <li><a href="/faq" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">FAQ</a></li>
                  <li><a href="/privacy" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">Terms of Service</a></li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>Contact</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-gray-600">
                    <Mail className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">support@connecthub.com</span>
                  </li>
                  <li className="flex items-start space-x-3 text-gray-600">
                    <Phone className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">123 Connect Street, Tech City, TC 12345</span>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="pt-8 border-t-2 border-violet-200">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-gray-600 text-sm font-medium">
                  © 2025 ConnectHub. Made with <Heart className="w-4 h-4 inline text-pink-500 fill-pink-500 animate-pulse" /> by our amazing team
                </p>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border-2 border-violet-100">
                  <Sparkles className="w-4 h-4 text-violet-500 animate-pulse" />
                  <span className="text-gray-700 font-semibold text-sm">Connecting People Worldwide</span>
                  <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

export default function RoomPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [roomId, setRoomId] = useState('');
  // const navigate = useNavigate();
  const { isLoggedIn, logout ,myCoin } = useAuth();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
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

  const handleJoin = () => {
    if (!roomId) {
      alert('Please enter a room ID');
      return;
    }
    // navigate(`https://meet.jit.si/${roomId}`); // redirect to the Jitsi room
    window.location.href = `https://meet.jit.si/${roomId}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      <Header isLoggedIn={isLoggedIn} onLogout={logout} myCoin={myCoin} />
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      
      {floatingElements.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-bounce ${
            item.type === 'heart' ? 'text-pink-300' : 
            item.type === 'star' ? 'text-yellow-300' : 
            item.type === 'smile' ? 'text-blue-300' : 'text-violet-300'
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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className={`w-full max-w-md transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-block mb-6 relative">
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl shadow-violet-300/50 animate-bounce border-4 border-white">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                Join a Room
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your Room ID to start the meeting ✨
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border-4 border-violet-100">
            <div className="space-y-6">
              <div className="group">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="w-full pl-4 pr-4 py-4 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleJoin}
                className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-violet-400/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Heart className="w-6 h-6 group-hover:fill-white transition-all" />
                  <span>Join Room</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-lg px-6 py-3 rounded-full shadow-lg border-2 border-violet-100">
              <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
              <span className="text-gray-700 font-semibold text-sm">Secure & Magical</span>
              <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
