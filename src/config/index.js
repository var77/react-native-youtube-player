const YOUTUBE_API_KEY = "YOUR_API_KEY";
export default {
  API_URL: "http://52.232.85.160/api?vid=",
  SEARCH_API_URL: `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=40&q=`
}
