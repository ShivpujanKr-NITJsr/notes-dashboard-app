import axios from 'axios';
// import { openapikey } from '../../config/db.js';

export const getAIResponse=async (prompt)=> {
  const res = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mistral-7b-instruct',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'HTTP-Referer': `${process.env.REFERER_URL}`,
        'X-Title': 'SmartNotesAI',
      },
    }
  );
  return res.data.choices[0].message.content.trim();
}

export const generateSummary=async (content) =>{
  return await getAIResponse(`Summarize this note: ${content}`);
}

export const suggestTags=async(content)=> {
  const response = await getAIResponse(`Suggest 2 relevant tags for this note content (return only tags): ${content}`);
return response.split(/[,\n]/).map(t => t.trim()).filter(Boolean);
}
