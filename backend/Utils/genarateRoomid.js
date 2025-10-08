// Array of words for generating readable IDs
const words = [
    'skill', 'learn', 'teach', 'share', 'master', 'expert', 'guide', 'mentor',
    'code', 'design', 'music', 'art', 'photo', 'video', 'game', 'sport',
    'tech', 'data', 'cloud', 'web', 'mobile', 'ai', 'blockchain', 'crypto',
    'creative', 'innovative', 'digital', 'modern', 'future', 'smart', 'fast',
    'secure', 'reliable', 'efficient', 'powerful', 'dynamic', 'flexible'
];

// Array of adjectives for variety
const adjectives = [
    'amazing', 'brilliant', 'creative', 'dynamic', 'elite', 'fantastic',
    'genius', 'heroic', 'incredible', 'legendary', 'magnificent', 'outstanding',
    'perfect', 'remarkable', 'spectacular', 'tremendous', 'ultimate', 'vibrant',
    'wonderful', 'excellent', 'superior', 'premium', 'golden', 'silver'
];

/**
 * Generates a simple random string by merging 2 different words and adding a 5-digit random number
 * @returns {string} Random string with format: word1-word2-12345
 */
export const generateRandomString = () => {
    // Get two random words from different pools
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // Generate 5-digit random number
    const randomNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    
    // Combine with dashes
    return `${randomAdjective}-${randomWord}-${randomNumber}`;
};