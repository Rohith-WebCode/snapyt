const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const summarizeWithGemini = async (text) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `Summarize this YouTube video transcript:\n\n${text.slice(0, 2000)}` }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data, null, 2));

    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return result || 'Summary could not be generated.';
  } catch (error) {
    return `Gemini API error: ${error.message}`;
  }
};

module.exports = { summarizeWithGemini };
