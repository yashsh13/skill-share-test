import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Heart, Sparkles, MessageCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Coins, Bell, User, LogOut, LogIn, Check, CheckCheck, Tag, MessageSquare, DoorOpen } from 'lucide-react';

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