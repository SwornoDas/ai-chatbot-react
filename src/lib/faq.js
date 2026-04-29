export const faqData = [
  {
    question: "What languages does the chatbot support?",
    answer:
      "Our chatbot supports over 80 languages with real-time translation capabilities, including major languages like English, Spanish, French, German, Chinese, Japanese, and many more.",
  },
  {
    question: "How accurate is the translation?",
    answer:
      "Our translation system uses advanced AI technology to provide highly accurate translations. The system is continuously learning and improving to ensure the best possible communication experience.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All conversations are encrypted, and we follow strict privacy protocols to protect your information. We also comply with major data protection regulations.",
  },
  {
    question: "Can I save chat history?",
    answer:
      "Yes, all conversations are automatically logged and can be accessed through your account. You can also export chat histories for record-keeping.",
  },
  {
    question: "How does the AI understand context?",
    answer:
      "Our AI uses advanced natural language processing to understand context and maintain coherent conversations. It can remember previous messages in the conversation to provide more relevant responses.",
  },
];

export const searchFAQ = async (query) => {
  const normalizedQuery = query.toLowerCase();

  for (const faq of faqData) {
    if (
      faq.question.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(faq.question.toLowerCase())
    ) {
      return faq.answer;
    }

    // Check for keyword matches
    const keywords = faq.question.toLowerCase().split(" ");
    const queryWords = normalizedQuery.split(" ");

    const hasCommonWords = keywords.some((keyword) =>
      queryWords.some(
        (word) =>
          word.length > 3 && (keyword.includes(word) || word.includes(keyword))
      )
    );

    if (hasCommonWords) {
      return faq.answer;
    }
  }

  return null;
};
