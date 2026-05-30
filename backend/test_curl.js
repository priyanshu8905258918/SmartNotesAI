import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY environment variable is not defined.');
  process.exit(1);
}

const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

async function run() {
  console.log(' Executing the equivalent HTTP request in Node.js...');
  try {
    const res = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: 'Explain how AI works in a few words'
            }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      }
    });
    console.log(' Success!');
    console.log(' AI Output:', res.data.candidates[0].content.parts[0].text);
  } catch (error) {
    if (error.response) {
      console.error(' API Error Status:', error.response.status);
      console.error(' API Error Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(' Error:', error.message);
    }
  }
}

run();
