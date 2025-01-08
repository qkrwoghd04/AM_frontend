import axios from 'axios'

export const youtubeApi = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: "AIzaSyA-0N9viOOnwa28lEeQzP-qb-h1z0aLLPA" },
});