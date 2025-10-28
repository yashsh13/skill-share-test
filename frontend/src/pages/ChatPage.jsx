import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import useAuth from '../hooks/useAuth';
import { Send } from 'lucide-react';

const ChatPage = () => {
  const { isLoggedIn, logout, loading, myCoin } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/user/wrap-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = { sender: 'ai', text: data.data };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } else {
        const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong.' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
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
        <div className="w-full max-w-4xl h-full flex flex-col bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border-4 border-violet-100">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-lg break-all ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-violet-100 text-gray-800'}`}>
                  {message.sender === 'ai' ? (
                    <>
                      <span className="text-xs text-gray-500 mr-2">AI:</span>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                    </>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-4 rounded-lg bg-violet-100 text-gray-800 break-all">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-8 py-6 bg-violet-50/50 border-2 border-violet-200 rounded-2xl focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 text-lg font-medium"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-violet-400/50 hover:shadow-violet-500/70 hover:scale-105 transition-all duration-300 overflow-hidden"
              disabled={isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Send</span>
                <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatPage;