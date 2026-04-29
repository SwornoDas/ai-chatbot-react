import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, Brain, Database, Sparkles, Users, Shield, Zap } from 'lucide-react';
import ChatWidget from '@/components/ChatWidget';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: Globe,
      title: "80+ Languages",
      description: "Real-time translation powered by advanced AI technology"
    },
    {
      icon: Brain,
      title: "Smart FAQ",
      description: "Intelligent knowledge base with contextual responses"
    },
    {
      icon: Database,
      title: "Conversation Logging",
      description: "Secure storage and analytics for all interactions"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant responses with sub-second translation times"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Always available to help your customers worldwide"
    }
  ];

  const stats = [
    { number: "80+", label: "Languages Supported" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "< 1s", label: "Response Time" },
    { number: "10M+", label: "Messages Processed" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-200 to-pink-200 px-4 py-2 rounded-full text-sm font-medium text-purple-800">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Advanced AI Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Multilingual AI Chatbot
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Break language barriers with our intelligent chatbot that translates conversations in real-time across 80+ languages while providing smart FAQ support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsChatOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
                aria-label="Start chatting with our AI assistant"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 focus-ring"
                onClick={() => {
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Learn more about our features"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="glass-effect rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl">
              <img  
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" 
                alt="AI chatbot interface showing multilingual conversation with translation capabilities"
               src="https://images.unsplash.com/photo-1675023035272-3426884896f8" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI chatbot combines cutting-edge translation technology with intelligent conversation management to deliver exceptional user experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Ready to Break Language Barriers?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of businesses already using our multilingual AI chatbot to connect with customers worldwide.
            </p>
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
              aria-label="Try our chatbot now"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Try It Now - It's Free!
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/70 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AI Chatbot</span>
          </div>
          <p className="text-gray-600 mb-4">
            Connecting the world through intelligent multilingual conversations.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 AI Chatbot. All rights reserved. Built with accessibility and privacy in mind.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default LandingPage;