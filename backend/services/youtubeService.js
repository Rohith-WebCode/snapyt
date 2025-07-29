const { YoutubeTranscript } = require('youtube-transcript');

const getTranscriptFromYoutube = async (url) => {
  let videoId;

  try {
    const parsedUrl = new URL(url);

    // Handle both "youtu.be" and "youtube.com" URLs
    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname.includes('youtube.com')) {
      videoId = parsedUrl.searchParams.get('v');
    }

    if (!videoId) throw new Error("Invalid YouTube URL");

    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });

    if (!transcriptData || transcriptData.length === 0) {
      throw new Error("No transcript data found for this video.");
    }

    const fullTranscript = transcriptData.map(item => item.text).join(' ');
  
    if (fullTranscript.trim().length < 10) {
      throw new Error("Transcript is too short or empty.");
    }

    return fullTranscript;

  } catch (error) {
    console.error("Transcript fetch error:", error.message);
    return ''; // fallback to empty string
  }
};

module.exports = { getTranscriptFromYoutube };