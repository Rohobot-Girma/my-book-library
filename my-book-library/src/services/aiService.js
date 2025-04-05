import axios from 'axios';

const OPENAI_API_KEY = 'https://platform.openai.com/docs/overview';

export async function getBookRecommendations(bookTitle) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Recommend 5 books similar to "${bookTitle}". 
            Return only the titles and authors in this format: 
            "1. Title by Author\n2. Title by Author\n..."`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return "Could not fetch recommendations at this time.";
  }
}