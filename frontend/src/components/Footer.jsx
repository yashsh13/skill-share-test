import { Heart, Sparkles, MessageCircle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react';

// Footer Component
export function Footer() {
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
