import axios from 'axios';
// import 'dotenv/config'

const huggingFaceAPIKey = process.env.OPENAI_API_KEY_HUGGINGFACE;
// console.log(huggingFaceAPIKey)

const getAIResponse = async (prompt) => {
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/facebook/bart-large-cnn', // Example model
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${huggingFaceAPIKey}`,
      },
    }
  );
  console.log(response.data);
  return response.data[0].summary_text; // For summarization
};

export const generateSummaryV2 = async (content) => {
  return await getAIResponse(`Summarize the following note and make sure the summary is always shorter than the original content:${content}`);
};

export const suggestTagsV2 = async (content) => {
  const response = await getAIResponse(`Suggest two tags for this note content: ${content}`);
  return response.split(',').map(tag => tag.trim()).filter(Boolean);
};
