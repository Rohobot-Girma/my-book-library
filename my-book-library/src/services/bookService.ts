//const API_KEY = 'AIzaSyDUZ1c9XAhT2t38NdTLMIzwXssWVcvtDKM'; // Updated API key as requested
const API_KEY = 'AIzaSyBYIDTr0lrZJbM_ADA_GZ9JE4rgkGOf2jo'; // Meta 
const API_BASE_URL = 'https://www.googleapis.com/books/v1';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    pageCount?: number;
    averageRating?: number;
    ratingsCount?: number;
    publisher?: string;
    language?: string;
    infoLink?: string;
    previewLink?: string;
  };
}

export interface SearchResponse {
  items: Book[];
  totalItems: number;
  kind: string;
}

// List of popular book categories for browsing
export const popularCategories = [
  'Fiction', 
  'Science Fiction',
  'Mystery',
  'Fantasy',
  'Romance',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Science',
  'Travel',
  'Poetry'
];

// Sample data to use as fallback when API fails
const SAMPLE_BOOKS: Record<string, Book[]> = {
  fiction: [
    {
      id: 'sample-fiction-1',
      volumeInfo: {
        title: 'The Great Novel',
        authors: ['Jane Author'],
        description: 'A fascinating story about adventure and discovery.',
        categories: ['Fiction'],
        publishedDate: '2022',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192?text=Fiction'
        }
      }
    },
    {
      id: 'sample-fiction-2',
      volumeInfo: {
        title: 'Mystery Island',
        authors: ['John Writer'],
        description: 'An intriguing tale of mystery on a remote island.',
        categories: ['Fiction', 'Mystery'],
        publishedDate: '2021',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192?text=Mystery'
        }
      }
    },
  ],
  romance: [
    {
      id: 'sample-romance-1',
      volumeInfo: {
        title: 'Love in Paris',
        authors: ['Emma Romance'],
        description: 'A heartwarming love story set in the city of lights.',
        categories: ['Romance'],
        publishedDate: '2023',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192?text=Romance'
        }
      }
    },
    {
      id: 'sample-romance-2',
      volumeInfo: {
        title: 'Summer Love',
        authors: ['Alex Heart'],
        description: 'A passionate summer romance by the beach.',
        categories: ['Romance'],
        publishedDate: '2022',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192?text=Romance'
        }
      }
    }
  ],
  default: [
    {
      id: 'sample-book-1',
      volumeInfo: {
        title: 'Sample Book Title',
        authors: ['Sample Author'],
        description: 'This is a placeholder book description used when API data cannot be loaded.',
        categories: ['General'],
        publishedDate: '2023',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192?text=Book'
        }
      }
    }
  ]
};

// Generate sample books for all popular categories
popularCategories.forEach(category => {
  const lowerCategory = category.toLowerCase();
  if (!SAMPLE_BOOKS[lowerCategory]) {
    SAMPLE_BOOKS[lowerCategory] = [
      {
        id: `sample-${lowerCategory}-1`,
        volumeInfo: {
          title: `${category} Best Seller`,
          authors: ['Top Author'],
          description: `A popular book in the ${category} category.`,
          categories: [category],
          publishedDate: '2023',
          imageLinks: {
            thumbnail: `https://via.placeholder.com/128x192?text=${encodeURIComponent(category)}`
          }
        }
      },
      {
        id: `sample-${lowerCategory}-2`,
        volumeInfo: {
          title: `${category} Classic`,
          authors: ['Classic Writer'],
          description: `A timeless classic in the ${category} category.`,
          categories: [category],
          publishedDate: '2010',
          imageLinks: {
            thumbnail: `https://via.placeholder.com/128x192?text=${encodeURIComponent(category)}`
          }
        }
      }
    ];
  }
});

export const fetchTrendingBooks = async (category: string = 'fiction', maxResults: number = 12): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/volumes?q=subject:${category}&orderBy=relevance&maxResults=${maxResults}&key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      // Return sample data based on category
      const lowerCategory = category.toLowerCase();
      return SAMPLE_BOOKS[lowerCategory] || SAMPLE_BOOKS.default;
    }
    
    const data: SearchResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching trending books:', error);
    // Return sample data based on category
    const lowerCategory = category.toLowerCase();
    return SAMPLE_BOOKS[lowerCategory] || SAMPLE_BOOKS.default;
  }
};

export const searchBooks = async (query: string, maxResults: number = 20): Promise<Book[]> => {
  if (!query?.trim()) return [];
  
  try {
    const response = await fetch(`${API_BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      // Return some sample books for search results
      return SAMPLE_BOOKS.default;
    }
    
    const data: SearchResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return SAMPLE_BOOKS.default;
  }
};

export const getBookDetails = async (bookId: string): Promise<Book | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/volumes/${bookId}?key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      // Return a sample book for the details page
      return SAMPLE_BOOKS.default[0];
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book details for ID ${bookId}:`, error);
    return SAMPLE_BOOKS.default[0];
  }
};

export const getBooksByCategory = async (category: string, maxResults: number = 20): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/volumes?q=subject:${encodeURIComponent(category)}&maxResults=${maxResults}&key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      // Return sample data based on category
      const lowerCategory = category.toLowerCase();
      return SAMPLE_BOOKS[lowerCategory] || SAMPLE_BOOKS.default;
    }
    
    const data: SearchResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching books for category ${category}:`, error);
    // Return sample data based on category
    const lowerCategory = category.toLowerCase();
    return SAMPLE_BOOKS[lowerCategory] || SAMPLE_BOOKS.default;
  }
};

export const getBookRecommendations = async (bookId: string, maxResults: number = 6): Promise<Book[]> => {
  try {
    // First get the book details to extract categories or authors for recommendations
    const bookDetails = await getBookDetails(bookId);
    
    if (!bookDetails) return SAMPLE_BOOKS.default;
    
    // Use categories or authors for recommendation search
    const category = bookDetails.volumeInfo.categories?.[0];
    const author = bookDetails.volumeInfo.authors?.[0];
    
    let query = '';
    if (category) {
      query = `subject:${category}`;
    } else if (author) {
      query = `inauthor:${author}`;
    } else {
      return SAMPLE_BOOKS.default; // No recommendation criteria available
    }
    
    // Add exclusion for current book
    query += `+-id:${bookId}`;
    
    const response = await fetch(`${API_BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`);
    
    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      // Return sample recommendations based on category if available
      const lowerCategory = category ? category.toLowerCase() : '';
      return SAMPLE_BOOKS[lowerCategory] || SAMPLE_BOOKS.default;
    }
    
    const data: SearchResponse = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching book recommendations for book ID ${bookId}:`, error);
    return SAMPLE_BOOKS.default;
  }
};

// Get a placeholder image when book has no cover
export const getBookCoverImage = (book: Book): string => {
  return book.volumeInfo.imageLinks?.thumbnail || 
         book.volumeInfo.imageLinks?.smallThumbnail || 
         'https://via.placeholder.com/128x192?text=No+Cover';
};
