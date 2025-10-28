import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn, Send } from 'lucide-react';
// import { set } from 'mongoose';


import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Home Page Component
export default function HomePage() {
  const { isLoggedIn, logout, loading ,myCoin } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'star' : i % 4 === 2 ? 'sparkle' : 'smile'
    }));
    setFloatingElements(elements);
  }, []);

  const handleConnect = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/user/submit-prompt",
        { prompt },
        { withCredentials: true }
      );
  
      if (data?.success) {
        // Redirect to the generated room
        window.location.href = `https://meet.jit.si/${data?.roomId}`;
      } else {
        alert(data?.message || "Failed to connect. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Please login to connect");
    }
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

      <main className="relative flex-1 flex items-center justify-center px-6 py-12 z-10">
        {loading ? (
          <div className="text-gray-600">Checking session...</div>
        ) : (
        <div className="w-full max-w-4xl">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-2xl opacity-60 animate-pulse" />
                <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                WELCOME
              </span>
            </h1>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-200/50 p-6 border-4 border-violet-100 inline-block">
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                <span className="font-bold text-violet-600">Exit meet before 3 minutes</span><br />
                <span className="font-bold text-pink-600">if got connected to wrong person</span><br />
                <span className="font-bold text-blue-600">or coins may deduct</span>
              </p>
            </div>
          </div>

          {/* Prompt Input Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border-4 border-violet-100">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter Your Prompt"
                className="flex-1 px-8 py-6 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 text-lg font-medium"
              />
              <button
                onClick={handleConnect}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-violet-400/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>Connect</span>
                  <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>


        </div>
        )}
      </main>

      <Footer />
    </div>
  );
}