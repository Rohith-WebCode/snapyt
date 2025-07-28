const { getTranscript } = require('youtube-transcript');

const getTranscriptFromYoutube =async (url)=>{
  let videoId;

  try {
    const parsedUrl = new URL(url);

    // Handle both "youtu.be" and "youtube.com" URLs
    if (parsedUrl.hostname === 'youtu.be') {
      videoId = parsedUrl.pathname.slice(1); // /eIrMbAQSU34 → eIrMbAQSU34
    } else if (parsedUrl.hostname.includes('youtube.com')) {
      videoId = parsedUrl.searchParams.get('v');
    }

    if (!videoId) throw new Error("Invalid YouTube URL");

    const transcriptData = await getTranscript(videoId);

    return transcriptData.map(item => item.text).join(' ');
  } catch (error) {
    throw new Error(`Transcript fetch error: ${error.message}`);
  }
    return transcriptData.map(item => item.text).join(' ');
}

module.exports =  {getTranscriptFromYoutube} ;