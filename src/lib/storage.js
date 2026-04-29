export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error loading from localStorage:`, error);
    return null;
  }
};

export const logConversation = (conversationId, userMessage, botMessage) => {
  try {
    const conversations = loadFromLocalStorage(`chatHistory`) || {};
    if (!conversations[conversationId]) {
      conversations[conversationId] = [];
    }
    conversations[conversationId].push({ userMessage, botMessage, timestamp: new Date() });
    saveToLocalStorage(`chatHistory`, conversations);
  } catch (error) {
    console.error(`Error logging conversation:`, error);
  }
};

export const getConversationHistory = (conversationId) => {
  try {
    const conversations = loadFromLocalStorage(`chatHistory`) || {};
    return conversations[conversationId] || [];
  } catch (error) {
    console.error(`Error getting conversation history:`, error);
    return [];
  }
};
