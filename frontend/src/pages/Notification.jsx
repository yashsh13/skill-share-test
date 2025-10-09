import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn, Check, CheckCheck, Tag, MessageSquare, DoorOpen } from 'lucide-react';

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
                <a href="/home"><h1 className="text-3xl md:text-4xl font-black text-gray-800">Share Skill</h1></a>
              </div>
  
              <div className="flex items-center space-x-3">
                <button className="hidden md:flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-white border-2 border-violet-200 rounded-full hover:border-violet-400 hover:scale-105 transition-all shadow-lg hover:shadow-xl group">
                  <MessageCircle className="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
                  <span className="hidden md:block ml-2 font-semibold text-gray-700">Room</span>
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

  // Notification Card Component
function NotificationCard({ notification, onAccept }) {
    const [expanded, setExpanded] = useState(false);
  
    const handleAccept = () => {
      setExpanded(true);
      onAccept(notification._id);
    };
  
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg shadow-violet-200/50 border-2 border-violet-100 p-6 hover:scale-102 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              {/* ✅ show the prompt as title */}
              <h3 className="font-bold text-gray-800 text-lg">
                {notification.prompt || "New Notification"}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {notification.read ? (
            <CheckCheck className="w-6 h-6 text-green-500" />
          ) : (
            <span className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
          )}
        </div>
  
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-violet-500" />
            <span className="text-sm font-semibold text-gray-700">Tag:</span>
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
              {notification.tag || "General"}
            </span>
          </div>
  
          {!expanded ? (
            <button
              onClick={handleAccept}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Accept & View Room</span>
            </button>
          ) : (
            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top duration-300">
              {/* ✅ Show Room ID only after accept */}
              <div className="p-4 bg-blue-50/50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start space-x-2 mb-2">
                  <DoorOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Room ID:</span>
                </div>
                <p className="text-gray-800 font-mono text-sm pl-7">{notification.roomId}</p>
              </div>
  
              <button
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Room</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  

// Main Notifications Page Component
export default function NotificationsPage() {
  const { isLoggedIn, logout, loading, myCoin } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'star' : i % 4 === 2 ? 'sparkle' : 'smile'
    }));
    setFloatingElements(elements);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const { data } = await axios.get(
        'http://localhost:3001/api/user/fetch-notifications',
        { withCredentials: true }
      );
      if (data?.success) {
        setNotifications(data?.data?.notifications || []);
      }
    } catch (error) {
      console.log("Failed to fetch notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleAccept = (notificationId) => {
    // Mark notification as read
    console.log("Accepted notification:", notificationId);
    // You can add API call here to mark as read
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      <Header isLoggedIn={isLoggedIn} onLogout={logout} myCoin={myCoin} />

      {/* Floating Background Elements */}
      {floatingElements.map((item) => (
        <div
          key={item.id}
          className={`fixed animate-bounce ${
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
            opacity: 0.3,
            zIndex: 0
          }}
        >
          {item.type === 'heart' ? '💗' : 
           item.type === 'star' ? '⭐' : 
           item.type === 'smile' ? '😊' : '✨'}
        </div>
      ))}

      <main className="relative flex-1 px-6 py-12 z-10">
        {loading || loadingNotifications ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 font-medium">Loading notifications...</p>
            </div>
          </div>
        ) : !isLoggedIn ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                <Bell className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                Login Required
              </h2>
              <p className="text-gray-600 text-lg">Please login to view your notifications</p>
              <a href="/login" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">
                Go to Login
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-2xl opacity-60 animate-pulse" />
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                    <Bell className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-black mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                  Your Notifications
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'} waiting for you ✨
              </p>
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-200/50 p-12 border-4 border-violet-100 inline-block">
                  <Sparkles className="w-16 h-16 text-violet-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Notifications Yet</h3>
                  <p className="text-gray-600">You're all caught up! Check back later for new connection requests.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    onAccept={handleAccept}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}