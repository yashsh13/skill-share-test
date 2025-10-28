import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn } from 'lucide-react';
import {
  Calendar,
  Star,
  RefreshCw,
  Pencil,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, logout, myCoin } = useAuth(); 

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("http://localhost:3001/api/user/get-profile", {
          withCredentials: true, // to include cookies
        });
        if (response.data.success) {
          setProfile(response.data.data);
        } else {
          setError(response.data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-violet-500 font-semibold text-xl animate-pulse">
        <RefreshCw className="w-6 h-6 mr-2 animate-spin" /> Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-500 font-semibold text-lg">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
    <Header isLoggedIn={isLoggedIn} onLogout={logout} myCoin={myCoin} />
    <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 p-6">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-200/50 border-2 border-violet-100 p-8 w-full max-w-lg transition-all hover:scale-[1.01] duration-300">
        {/* ✏️ Edit Button */}
        <button
          onClick={() => navigate("/update-profile")}
          className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 transition-all"
        >
          <Pencil className="w-4 h-4" />
          <span>Edit</span>
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.username}</h2>
          <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
        </div>

        <div className="space-y-5 text-gray-700">
          <div className="flex items-center space-x-3">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">Coins:</span>
            <span className="text-gray-800 font-medium">{profile.coins}</span>
          </div>

          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-violet-500 mt-0.5" />
            <div>
              <span className="font-semibold">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No skills added yet</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Joined:</span>
            <span className="text-gray-800 font-medium">
              {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-violet-100 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Member ID: <span className="font-mono">{profile._id}</span>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
