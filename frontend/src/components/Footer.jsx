// import { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Home, Users, Bell, Settings, LogOut, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react';

// Footer Component
export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Decorative wave top */}
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
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-xl opacity-60" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
                  Share Skill
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

            {/* Quick Links */}
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

            {/* Support */}
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

            {/* Contact Info */}
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

          {/* Bottom Bar */}
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

// Demo Page showing Header and Footer
export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-2xl">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-violet-300 rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
              Header & Footer
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Reusable components with the same beautiful theme as the login and register pages! 
            These components are ready to be used across all your pages. ✨
          </p>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border-4 border-violet-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h2>
            <div className="text-left space-y-4 text-gray-600">
              <p className="font-medium">Simply import and use the components:</p>
              <div className="bg-violet-50 p-4 rounded-xl border-2 border-violet-200">
                <code className="text-sm text-violet-700">
                  import &#123; Header, Footer &#125; from './HeaderFooter';
                </code>
              </div>
              <p className="font-medium">Then add them to any page:</p>
              <div className="bg-violet-50 p-4 rounded-xl border-2 border-violet-200">
                <code className="text-sm text-violet-700">
                  &lt;Header /&gt;<br/>
                  &lt;main&gt;Your content here&lt;/main&gt;<br/>
                  &lt;Footer /&gt;
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}