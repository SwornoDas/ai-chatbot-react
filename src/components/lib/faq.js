// FAQ Knowledge Base System

const FAQ_DATABASE = [
  {
    id: 1,
    question: "What languages do you support?",
    answer: "I support over 80 languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, and many more. You can select your preferred language from the dropdown menu.",
    keywords: ["language", "languages", "support", "translate", "translation", "multilingual", "speak"],
    category: "languages"
  },
  {
    id: 2,
    question: "How does the translation work?",
    answer: "I use advanced AI-powered translation technology to provide real-time translation. When you type in your language, I can detect it automatically and respond in the same language, or you can manually select your preferred language.",
    keywords: ["translation", "translate", "how", "work", "real-time", "automatic", "detect"],
    category: "translation"
  },
  {
    id: 3,
    question: "Is my conversation data secure?",
    answer: "Yes, your privacy and security are our top priorities. All conversations are encrypted and stored securely. We follow industry-standard security practices and never share your personal information with third parties.",
    keywords: ["secure", "security", "privacy", "data", "safe", "encrypted", "protection", "confidential"],
    category: "security"
  },
  {
    id: 4,
    question: "Can you help me with technical support?",
    answer: "I can help with general questions and common issues. For complex technical problems, I can guide you to the right resources or help you contact our technical support team.",
    keywords: ["technical", "support", "help", "problem", "issue", "troubleshoot", "assistance"],
    category: "support"
  },
  {
    id: 5,
    question: "What are your operating hours?",
    answer: "I'm available 24/7! As an AI assistant, I never sleep and can help you anytime, day or night, in any supported language.",
    keywords: ["hours", "time", "available", "24/7", "always", "when", "schedule"],
    category: "availability"
  },
  {
    id: 6,
    question: "How accurate is the translation?",
    answer: "Our translation accuracy is very high, typically above 95% for common languages. The accuracy may vary slightly for less common languages or highly technical content, but we continuously improve our translation models.",
    keywords: ["accuracy", "accurate", "quality", "good", "reliable", "correct", "precise"],
    category: "translation"
  },
  {
    id: 7,
    question: "Can I use voice input?",
    answer: "Currently, I support text-based conversations with optional text-to-speech output. Voice input functionality is planned for future updates. You can enable speech output using the speaker icon in the chat.",
    keywords: ["voice", "speech", "audio", "speak", "microphone", "sound", "listen"],
    category: "features"
  },
  {
    id: 8,
    question: "Do you store conversation history?",
    answer: "Yes, conversations are logged for quality improvement and to provide better assistance. You can request deletion of your conversation history at any time by contacting our support team.",
    keywords: ["history", "store", "save", "log", "record", "remember", "delete"],
    category: "data"
  },
  {
    id: 9,
    question: "What if you don't understand my question?",
    answer: "If I don't understand your question, I'll ask for clarification or try to provide related information that might be helpful. You can also rephrase your question or try asking in a different way.",
    keywords: ["understand", "don't know", "confused", "unclear", "help", "clarification"],
    category: "support"
  },
  {
    id: 10,
    question: "Can you learn from our conversations?",
    answer: "I use conversation data to improve my responses and better understand user needs, but I don't learn or remember information from individual conversations in real-time. Each conversation starts fresh.",
    keywords: ["learn", "remember", "improve", "smart", "AI", "machine learning", "training"],
    category: "ai"
  }
];

// Search FAQ database for relevant answers
export const searchFAQ = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Find exact matches first
  let bestMatch = null;
  let bestScore = 0;
  
  for (const faq of FAQ_DATABASE) {
    let score = 0;
    
    // Check if query matches question directly
    if (faq.question.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    // Check keyword matches
    const queryWords = normalizedQuery.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2) { // Ignore very short words
        for (const keyword of faq.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 1;
          }
        }
      }
    }
    
    // Check if any query words appear in the answer
    for (const word of queryWords) {
      if (word.length > 3 && faq.answer.toLowerCase().includes(word)) {
        score += 0.5;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }
  
  // Return answer if we have a good match (score > 1)
  if (bestMatch && bestScore > 1) {
    return bestMatch.answer;
  }
  
  return null; // No good match found
};

// Get all FAQ categories
export const getFAQCategories = () => {
  const categories = [...new Set(FAQ_DATABASE.map(faq => faq.category))];
  return categories;
};

// Get FAQs by category
export const getFAQsByCategory = (category) => {
  return FAQ_DATABASE.filter(faq => faq.category === category);
};

// Get all FAQs
export const getAllFAQs = () => {
  return FAQ_DATABASE;
};

// Add new FAQ (for admin purposes)
export const addFAQ = (question, answer, keywords, category) => {
  const newFAQ = {
    id: Math.max(...FAQ_DATABASE.map(faq => faq.id)) + 1,
    question,
    answer,
    keywords: Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim()),
    category
  };
  
  FAQ_DATABASE.push(newFAQ);
  return newFAQ;
};