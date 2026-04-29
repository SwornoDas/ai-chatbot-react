import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/components/LandingPage';

function App() {
  return (
    <>
      <Helmet>
        <title>AI Multilingual Chatbot - Instant Translation & Support</title>
        <meta name="description" content="Experience our advanced AI chatbot with real-time translation in 80+ languages, intelligent FAQ support, and seamless conversation logging." />
        <meta name="keywords" content="AI chatbot, multilingual, translation, FAQ, customer support, artificial intelligence" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="AI Multilingual Chatbot - Instant Translation & Support" />
        <meta property="og:description" content="Experience our advanced AI chatbot with real-time translation in 80+ languages, intelligent FAQ support, and seamless conversation logging." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Helmet>
      
      <div className="min-h-screen">
        <LandingPage />
        <Toaster />
      </div>
    </>
  );
}

export default App;