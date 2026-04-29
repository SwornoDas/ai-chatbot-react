import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Globe, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { translateText, detectLanguage } from '@/lib/translation';
import { searchFAQ } from '@/lib/faq';
import { logConversation, getConversationHistory } from '@/lib/storage';

const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [conversationId] = useState(() => Date.now().toString());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Hello! I'm your multilingual AI assistant. I can help you in over 80 languages and answer questions from our FAQ. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, selectedLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakText = (text, language) => {
    if ('speechSynthesis' in window && isSpeechEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Detect language if not English
      let detectedLang = selectedLanguage;
      if (selectedLanguage !== 'en') {
        detectedLang = await detectLanguage(inputText);
      }

      // Search FAQ first
      const faqResponse = await searchFAQ(inputText);
      let botResponseText = '';

      if (faqResponse) {
        botResponseText = faqResponse;
      } else {
        // Generate a contextual response
        botResponseText = generateContextualResponse(inputText);
      }

      // Translate response if needed
      let translatedResponse = botResponseText;
      if (selectedLanguage !== 'en') {
        translatedResponse = await translateText(botResponseText, 'en', selectedLanguage);
      }

      const botMessage = {
        id: Date.now() + 1,
        text: translatedResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage,
        originalText: botResponseText
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Log conversation
      logConversation(conversationId, userMessage, botMessage);
      
      // Speak response if enabled
      speakText(translatedResponse, selectedLanguage);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble processing your message right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to process your message. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const generateContextualResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! I'm here to help you with any questions you might have. Feel free to ask me anything!";
    }
    
    if (lowerInput.includes('language') || lowerInput.includes('translate')) {
      return "I can communicate in over 80 languages! Just select your preferred language from the dropdown menu, and I'll translate our conversation in real-time.";
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('support')) {
      return "I'm here to provide support and answer your questions. You can ask me about our services, get help with common issues, or just have a conversation. What would you like to know?";
    }
    
    if (lowerInput.includes('thank')) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know?";
    }
    
    return "That's an interesting question! While I don't have specific information about that topic in my current knowledge base, I'm here to help with general inquiries and support. Is there something specific I can assist you with?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="glass-effect rounded-3xl w-full max-w-md h-[600px] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                <p className="text-sm text-gray-600">Online • Multilingual</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                className="text-gray-600 hover:text-gray-800 focus-ring"
                aria-label={isSpeechEnabled ? "Disable speech" : "Enable speech"}
              >
                {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 focus-ring"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="px-6 py-3 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-sm text-gray-700 focus:outline-none focus-ring rounded px-2 py-1"
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-container scroll-smooth">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                  } shadow-sm`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="chat-bubble-bot p-3 shadow-sm">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/20">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/50 border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                aria-label="Type your message"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2 focus-ring"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWidget;