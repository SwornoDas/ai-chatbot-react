export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
];

export const detectLanguage = async (text) => {
  // Mock language detection - in a real app, you'd use a language detection service
  return "en";
};

export const translateText = async (text, targetLang) => {
  // Mock translation - in a real app, you'd use a translation service
  return text;
};
