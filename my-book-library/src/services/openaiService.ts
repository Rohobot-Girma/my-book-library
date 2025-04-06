
// Using a more secure approach for API key
// Instead of storing it directly in the code, we'll retrieve it from localStorage
// In a production app, this should be in a server environment or secure vault

// Helper function to get the API key
const getOpenAIKey = (): string => {
  return localStorage.getItem('openai_api_key') || '';
};

// Function to set the API key
export const setOpenAIKey = (key: string): void => {
  localStorage.setItem('openai_api_key', key);
};

// Function to check if API key exists
export const hasOpenAIKey = (): boolean => {
  return !!localStorage.getItem('openai_api_key');
};

export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Function to generate a better book summary using OpenAI
export const generateImprovedSummary = async (bookTitle: string, description: string): Promise<string> => {
  if (!description) return "No summary available for this book.";
  
  try {
    const apiKey = getOpenAIKey();
    if (!apiKey) {
      console.warn('OpenAI API key is not set');
      return description.length > 200 ? description.substring(0, 200) + '...' : description;
    }

    const prompt = `
      Book Title: "${bookTitle}"
      Original Description: "${description}"
      
      Task: Create a concise, engaging summary of this book in 2-3 sentences. Focus on the main theme and why someone might want to read it.
    `;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      // Fall back to simple summary if OpenAI fails
      return description.length > 200 ? description.substring(0, 200) + '...' : description;
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary with OpenAI:', error);
    // Fall back to simple summary if error occurs
    return description.length > 200 ? description.substring(0, 200) + '...' : description;
  }
};

// Get book recommendations based on book title/content
export const getOpenAIRecommendations = async (
  bookTitle: string,
  bookDescription: string
): Promise<string[]> => {
  try {
    const apiKey = getOpenAIKey();
    if (!apiKey) {
      console.warn('OpenAI API key is not set');
      return [];
    }
    
    const prompt = `
      Book Title: "${bookTitle}"
      Book Description: "${bookDescription}"
      
      Task: Based on this book, generate 5 book recommendations that would appeal to the same reader.
      Each recommendation should include just the title of the book. Return ONLY the book titles as a list,
      nothing else.
    `;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return [];
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse book titles from the response
    // Split by newlines and clean up any list markers (1., 2., -, etc.)
    const recommendations = content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+\.|\*|-|\s+/, '').trim())
      .filter(title => title.length > 0)
      .slice(0, 5);
    
    return recommendations;
  } catch (error) {
    console.error('Error getting OpenAI recommendations:', error);
    return [];
  }
};
