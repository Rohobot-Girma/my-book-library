
// This is a simple implementation for AI features
// In a production app, this would likely connect to a real AI API

// Helper function to strip HTML tags from text
export const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

// Mock function to generate book summary
export const generateBookSummary = async (description: string): Promise<string> => {
  // For now we'll just truncate the description as a simple "AI" summary
  // In a real implementation, this would call an actual AI API
  if (!description) return "No summary available for this book.";
  
  // Strip HTML tags first to avoid unclosed tags in the summary
  const cleanDescription = stripHtmlTags(description);
  
  // Just take the first 2 sentences or 200 characters
  const sentences = cleanDescription.split(/[.!?]+/);
  const summary = sentences.slice(0, 2).join('. ') + '.';
  
  return summary.length > 200 ? summary.substring(0, 200) + '...' : summary;
};

// Mock function to generate personalized recommendation message
export const generateRecommendationMessage = (bookTitle: string, categoryOrAuthor: string): string => {
  const messages = [
    `If you enjoyed "${bookTitle}", you might also like these other ${categoryOrAuthor} books.`,
    `Readers who liked "${bookTitle}" also explored these ${categoryOrAuthor} titles.`,
    `Based on your interest in "${bookTitle}", here are some similar ${categoryOrAuthor} recommendations.`,
    `Discover more great ${categoryOrAuthor} books like "${bookTitle}".`,
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};
