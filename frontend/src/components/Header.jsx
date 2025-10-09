
import { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn } from 'lucide-react';

// Header Component
export function Header({ isLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="bg-white/80 backdrop-blur-lg border-b-4 border-violet-100 shadow-xl shadow-violet-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Home Page Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-800">Home Page</h1>
            </div>

            {/* Right: Navigation Icons */}
            <div className="flex items-center space-x-3">
              {/* Room Button */}
              <button className="hidden md:flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-white border-2 border-violet-200 rounded-full hover:border-violet-400 hover:scale-105 transition-all shadow-lg hover:shadow-xl group">
                <MessageCircle className="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
                <span className="hidden md:block ml-2 font-semibold text-gray-700">Room</span>
              </button>

              {/* Coins */}
              <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                <Coins className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                <span className="hidden md:block ml-2 font-bold text-white">Coins</span>
              </button>

              {/* Notifications */}
              <button className="relative flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                <Bell className="w-5 h-5 text-white group-hover:animate-bounce" />
                <span className="hidden md:block ml-2 font-bold text-white">Notifications</span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>

              {/* Profile */}
              <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                <User className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="hidden md:block ml-2 font-bold text-white">Profile</span>
              </button>

              {/* Login/Logout Button */}
              {isLoggedIn ? (
                <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-pink-400 to-red-400 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                  <LogOut className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  <span className="hidden md:block ml-2 font-bold text-white">Logout</span>
                </button>
              ) : (
                <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 md:py-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-xl group border-2 border-white">
                  <LogIn className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  <span className="hidden md:block ml-2 font-bold text-white">Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-violet-50 rounded-lg transition-all"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-violet-50 transition-all font-semibold">
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 text-blue-600" />
                    <span>Login</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400"></div>
    </header>
  );
}