import axios from 'axios'
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

console.log(API_KEY)
export const youtubeApi = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: API_KEY },
});