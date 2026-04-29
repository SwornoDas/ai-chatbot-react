// Conversation logging and storage system using localStorage
// In production, this would integrate with a proper database

const STORAGE_KEYS = {
  CONVERSATIONS: 'chatbot_conversations',
  USER_PREFERENCES: 'chatbot_user_preferences',
  ANALYTICS: 'chatbot_analytics'
};

// Log a conversation exchange
export const logConversation = (conversationId, userMessage, botMessage) => {
  try {
    const conversations = getStoredConversations();
    
    if (!conversations[conversationId]) {
      conversations[conversationId] = {
        id: conversationId,
        startTime: new Date().toISOString(),
        messages: [],
        metadata: {
          userLanguage: userMessage.language || 'en',
          totalMessages: 0,
          lastActivity: new Date().toISOString()
        }
      };
    }
    
    // Add messages to conversation
    conversations[conversationId].messages.push(
      {
        ...userMessage,
        timestamp: userMessage.timestamp.toISOString()
      },
      {
        ...botMessage,
        timestamp: botMessage.timestamp.toISOString()
      }
    );
    
    // Update metadata
    conversations[conversationId].metadata.totalMessages += 2;
    conversations[conversationId].metadata.lastActivity = new Date().toISOString();
    
    // Store updated conversations
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    
    // Update analytics
    updateAnalytics(userMessage, botMessage);
    
    return true;
  } catch (error) {
    console.error('Error logging conversation:', error);
    return false;
  }
};

// Get conversation history
export const getConversationHistory = (conversationId) => {
  try {
    const conversations = getStoredConversations();
    return conversations[conversationId] || null;
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    return null;
  }
};

// Get all conversations
export const getAllConversations = () => {
  try {
    return getStoredConversations();
  } catch (error) {
    console.error('Error retrieving all conversations:', error);
    return {};
  }
};

// Get stored conversations from localStorage
const getStoredConversations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error parsing stored conversations:', error);
    return {};
  }
};

// Update analytics data
const updateAnalytics = (userMessage, botMessage) => {
  try {
    const analytics = getAnalytics();
    const today = new Date().toDateString();
    
    if (!analytics[today]) {
      analytics[today] = {
        totalMessages: 0,
        totalConversations: 0,
        languagesUsed: new Set(),
        averageResponseTime: 0,
        topKeywords: {}
      };
    }
    
    // Update daily stats
    analytics[today].totalMessages += 2;
    analytics[today].languagesUsed.add(userMessage.language || 'en');
    
    // Track keywords from user messages
    const words = userMessage.text.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 3) {
        analytics[today].topKeywords[word] = (analytics[today].topKeywords[word] || 0) + 1;
      }
    });
    
    // Convert Set to Array for storage
    analytics[today].languagesUsed = Array.from(analytics[today].languagesUsed);
    
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  } catch (error) {
    console.error('Error updating analytics:', error);
  }
};

// Get analytics data
export const getAnalytics = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error retrieving analytics:', error);
    return {};
  }
};

// Get user preferences
export const getUserPreferences = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {
      language: 'en',
      speechEnabled: false,
      theme: 'light'
    };
  } catch (error) {
    console.error('Error retrieving user preferences:', error);
    return {
      language: 'en',
      speechEnabled: false,
      theme: 'light'
    };
  }
};

// Save user preferences
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return false;
  }
};

// Clear all stored data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Export conversation data (for backup/analysis)
export const exportConversationData = () => {
  try {
    const conversations = getAllConversations();
    const analytics = getAnalytics();
    const preferences = getUserPreferences();
    
    const exportData = {
      conversations,
      analytics,
      preferences,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

// Get conversation statistics
export const getConversationStats = () => {
  try {
    const conversations = getAllConversations();
    const analytics = getAnalytics();
    
    const totalConversations = Object.keys(conversations).length;
    const totalMessages = Object.values(conversations).reduce(
      (sum, conv) => sum + (conv.metadata?.totalMessages || 0), 0
    );
    
    const languagesUsed = new Set();
    Object.values(conversations).forEach(conv => {
      if (conv.metadata?.userLanguage) {
        languagesUsed.add(conv.metadata.userLanguage);
      }
    });
    
    return {
      totalConversations,
      totalMessages,
      uniqueLanguages: languagesUsed.size,
      languagesUsed: Array.from(languagesUsed),
      dailyAnalytics: analytics
    };
  } catch (error) {
    console.error('Error getting conversation stats:', error);
    return {
      totalConversations: 0,
      totalMessages: 0,
      uniqueLanguages: 0,
      languagesUsed: [],
      dailyAnalytics: {}
    };
  }
};