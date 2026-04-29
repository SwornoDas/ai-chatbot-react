// Translation service using Google Translate API (mock implementation)
// In production, you would integrate with actual translation services

const SUPPORTED_LANGUAGES = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'fi': 'Finnish',
  'pl': 'Polish',
  'cs': 'Czech',
  'sk': 'Slovak',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sr': 'Serbian',
  'sl': 'Slovenian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'mt': 'Maltese',
  'el': 'Greek',
  'tr': 'Turkish',
  'he': 'Hebrew',
  'fa': 'Persian',
  'ur': 'Urdu',
  'bn': 'Bengali',
  'ta': 'Tamil',
  'te': 'Telugu',
  'ml': 'Malayalam',
  'kn': 'Kannada',
  'gu': 'Gujarati',
  'pa': 'Punjabi',
  'mr': 'Marathi',
  'ne': 'Nepali',
  'si': 'Sinhala',
  'my': 'Myanmar',
  'km': 'Khmer',
  'lo': 'Lao',
  'ka': 'Georgian',
  'am': 'Amharic',
  'sw': 'Swahili',
  'zu': 'Zulu',
  'af': 'Afrikaans',
  'sq': 'Albanian',
  'az': 'Azerbaijani',
  'be': 'Belarusian',
  'bs': 'Bosnian',
  'eu': 'Basque',
  'gl': 'Galician',
  'is': 'Icelandic',
  'ga': 'Irish',
  'mk': 'Macedonian',
  'cy': 'Welsh',
  'yi': 'Yiddish',
  'eo': 'Esperanto',
  'la': 'Latin',
  'jw': 'Javanese',
  'su': 'Sundanese',
  'ceb': 'Cebuano',
  'ny': 'Chichewa',
  'co': 'Corsican',
  'fy': 'Frisian',
  'haw': 'Hawaiian',
  'hmn': 'Hmong',
  'ig': 'Igbo',
  'lb': 'Luxembourgish',
  'mg': 'Malagasy',
  'ms': 'Malay',
  'mi': 'Maori',
  'mn': 'Mongolian',
  'ps': 'Pashto',
  'sm': 'Samoan',
  'gd': 'Scots Gaelic',
  'st': 'Sesotho',
  'sn': 'Shona',
  'sd': 'Sindhi',
  'so': 'Somali',
  'tg': 'Tajik',
  'th': 'Thai',
  'tk': 'Turkmen',
  'uk': 'Ukrainian',
  'uz': 'Uzbek',
  'vi': 'Vietnamese',
  'xh': 'Xhosa',
  'yo': 'Yoruba'
};

// Mock translation function - in production, integrate with Google Translate API
export const translateText = async (text, fromLang, toLang) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (fromLang === toLang) {
    return text;
  }
  
  // Mock translations for demo purposes
  const mockTranslations = {
    'en-es': {
      'Hello! I\'m your multilingual AI assistant.': '¡Hola! Soy tu asistente de IA multilingüe.',
      'How can I help you today?': '¿Cómo puedo ayudarte hoy?',
      'Thank you for your message.': 'Gracias por tu mensaje.',
      'I\'m here to help you with any questions you might have.': 'Estoy aquí para ayudarte con cualquier pregunta que puedas tener.'
    },
    'en-fr': {
      'Hello! I\'m your multilingual AI assistant.': 'Bonjour! Je suis votre assistant IA multilingue.',
      'How can I help you today?': 'Comment puis-je vous aider aujourd\'hui?',
      'Thank you for your message.': 'Merci pour votre message.',
      'I\'m here to help you with any questions you might have.': 'Je suis là pour vous aider avec toutes les questions que vous pourriez avoir.'
    },
    'en-de': {
      'Hello! I\'m your multilingual AI assistant.': 'Hallo! Ich bin Ihr mehrsprachiger KI-Assistent.',
      'How can I help you today?': 'Wie kann ich Ihnen heute helfen?',
      'Thank you for your message.': 'Vielen Dank für Ihre Nachricht.',
      'I\'m here to help you with any questions you might have.': 'Ich bin hier, um Ihnen bei allen Fragen zu helfen, die Sie haben könnten.'
    }
  };
  
  const translationKey = `${fromLang}-${toLang}`;
  const translations = mockTranslations[translationKey];
  
  if (translations && translations[text]) {
    return translations[text];
  }
  
  // For demo purposes, return the original text with a language indicator
  return `[${toLang.toUpperCase()}] ${text}`;
};

// Mock language detection
export const detectLanguage = async (text) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Simple language detection based on common words/patterns
  const patterns = {
    'es': /\b(hola|gracias|por favor|sí|no|cómo|qué|dónde|cuándo)\b/i,
    'fr': /\b(bonjour|merci|s'il vous plaît|oui|non|comment|quoi|où|quand)\b/i,
    'de': /\b(hallo|danke|bitte|ja|nein|wie|was|wo|wann)\b/i,
    'it': /\b(ciao|grazie|prego|sì|no|come|cosa|dove|quando)\b/i,
    'pt': /\b(olá|obrigado|por favor|sim|não|como|o que|onde|quando)\b/i,
    'ru': /[а-яё]/i,
    'zh': /[\u4e00-\u9fff]/,
    'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
    'ko': /[\uac00-\ud7af]/,
    'ar': /[\u0600-\u06ff]/,
    'hi': /[\u0900-\u097f]/
  };
  
  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }
  
  return 'en'; // Default to English
};

export const getSupportedLanguages = () => {
  return SUPPORTED_LANGUAGES;
};

export const isLanguageSupported = (langCode) => {
  return langCode in SUPPORTED_LANGUAGES;
};