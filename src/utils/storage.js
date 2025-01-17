export const CACHE_KEY = 'youtube_videos_cache';
export const CACHE_DURATION = 24 * 60 * 60 * 1000;

// 로컬 저장소에서 비디오 전부 가지고 오기
export const getStorageVideoIds = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { videoIds, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return videoIds;
}

// 로컬 저장소에 비디오 아이디 저장하기
export const storeVideoIds = (videoIds) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    videoIds,
    timestamp: Date.now()
  }))
}