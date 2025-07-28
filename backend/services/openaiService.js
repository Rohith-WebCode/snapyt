const OpenAI  = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const summarizeText = async(text)=>{
     const prompt = `Summarize the following YouTube video transcript into 5 bullet points and a short paragraph:\n\n${text}`;

     try {
        const Response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        })

        return Response.choices[0].message.content
        
     } catch (error) {
         console.error("Error summarizing text:", error.message);
         return "Failed to summarize text.";
     }
}

module.exports = {summarizeText}