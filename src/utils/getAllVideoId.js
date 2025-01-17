import { Company_PlayList } from '../utils/constants';
import { youtubeApi } from '../api/youtubeApi';

export const allVideoIdPromises = Company_PlayList.map(async ({ company, playlistId }) => {
  const res = await youtubeApi.get('playlistItems', {
    params: {
      part: 'snippet',
      playlistId: playlistId,
      maxResults: 25,
      fields: 'items(snippet/title,snippet/resourceId/videoId)'
    }
  });

  return res.data.items.map(item => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    company: company,
  }));
})