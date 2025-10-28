import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Heart, Sparkles } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn, Send } from 'lucide-react';

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
