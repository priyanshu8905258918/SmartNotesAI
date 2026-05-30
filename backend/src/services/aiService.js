import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';
import ApiError from '../utils/apiError.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

class AIService {
  async processNoteContent(content) {
    if (!content || content.trim().length === 0) {
      throw new ApiError(400, 'Content is empty. Cannot process empty content with AI.');
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig: {
          responseMimeType: 'application/json',
        },
      });

      const prompt = `
        You are an AI study assistant. Analyze the study/lecture note content provided below and generate:
        1. A concise, professional summary of the content (about 2-4 sentences).
        2. A list of key revision points or bullet points (between 3 to 7 points) summarizing the core concepts.
        3. A list of 1 to 4 relevant tags (e.g., "Computer Science", "Biology", "History", "Linear Algebra", "Economics") to organize this note. Match general subjects or specific topics. Keep tags capitalized.

        Respond strictly with a JSON object matching this schema:
        {
          "summary": "string",
          "revisionPoints": ["string"],
          "tags": ["string"]
        }

        Note content:
        "${content.replace(/"/g, '\\"')}"
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      console.log('🤖 Gemini AI successfully processed note content');
      
      const parsedData = JSON.parse(responseText);
      
      return {
        summary: parsedData.summary || '',
        revisionPoints: Array.isArray(parsedData.revisionPoints) ? parsedData.revisionPoints : [],
        tags: Array.isArray(parsedData.tags) ? parsedData.tags : [],
      };
    } catch (error) {
      console.error(`❌ Gemini AI processing failed: ${error.message}`);
      throw new ApiError(500, `AI processing failed: ${error.message}`);
    }
  }
}

export default new AIService();
