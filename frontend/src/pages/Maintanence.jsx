import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, RefreshCw, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn } from 'lucide-react';
import axios from "axios";

export default function FeatureInProcess() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, myCoin } = useAuth(); 

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
    <Header isLoggedIn={isLoggedIn} onLogout={logout} myCoin={myCoin} />
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 p-6">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-200/50 border-2 border-violet-100 p-10 w-full max-w-md text-center transition-all hover:scale-[1.01] duration-300">
        {/* Spinning Gradient Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 animate-pulse">
          <Wrench className="w-12 h-12 text-white animate-spin-slow" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Feature In Process
        </h1>
        <p className="text-gray-600 font-medium mb-6">
          This feature is currently being built. Stay tuned for something
          amazing coming soon! 🚀
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back to Home</span>
        </button>

        {/* Decorative Bottom Line */}
        <div className="mt-8 h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 rounded-full animate-pulse"></div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

// Optional slow spin animation
// Add this to your global CSS if not already existing:
{/* 
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 6s linear infinite;
}
*/}
