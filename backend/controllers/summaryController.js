const { getTranscriptFromYoutube } = require('../services/youtubeService');
const { summarizeWithGemini } = require('../services/geminiSummarizer');

const summarizeVideo =async (req,res)=>{
    const {url} = req.body
    console.log(url);
    if(!url) return res.status(401).json({ error: "YouTube URL is required" });
    try {
        const transcript  = await getTranscriptFromYoutube(url)
        console.log('this is', transcript);
        
        const summary = await summarizeWithGemini(transcript)
        if(!summary){
          return res.status(401).json({ error: "summary is not get" });
        }
        res.status(200).json({summary})
    } catch (error) {
    console.error("Summarization error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = summarizeVideo