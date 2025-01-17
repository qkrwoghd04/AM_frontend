import { useEffect, useState, useMemo } from 'react';
import './css/VideoList.css';
// 컴포넌트
import SearchBar from './SearchBar';
import Selector from './Selector'
import VideoItem from './VideoItem'
// constant
import { getStorageVideoIds, storeVideoIds } from '../utils/storage';
// util
import { allVideoIdPromises } from '../utils/getAllVideoId';
import VideoOverlay from './VideoOverlay';

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllVideos();
    setQuery('toss')
  }, []);

  const fetchAllVideos = async () => {
    // 캐시된 데이터 확인
    const cachedData = getStorageVideoIds();
    if (cachedData) {
      setVideoList(cachedData);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // 필요한 형태로 데이터 변환
      const results = await Promise.all(allVideoIdPromises);
      const allVideoId = results.flat();

      console.log(allVideoId);
      storeVideoIds(allVideoId);
      setVideoList(allVideoId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  // company에 따른 필터링
  const filteredCompanyName = useMemo(() => {
    if (!query) return videoList;
    return videoList.filter(video =>
      video.company.toLowerCase() === query.toLowerCase()
    );
  }, [videoList, query]);

  // 검색 결과 필터링
  const searchResults = useMemo(() => {
    if (!searchKeyword) return filteredCompanyName;
    return videoList.filter(video =>
      video.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [videoList, searchKeyword]);

  return (
    <>
      <SearchBar setSearchKeyword={setSearchKeyword} />
      <Selector setQuery={setQuery} setSearchKeyword={setSearchKeyword} />
      {selectedVideo && (
        <VideoOverlay selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
      )}

      <div className='Video'>
        {(searchKeyword ? searchResults : filteredCompanyName).map((videoInfo) => (
          <VideoItem key={videoInfo.id} videoInfo={videoInfo} handleVideoClick={handleVideoClick} />
        ))}
      </div>
    </>
  );
};

export default VideoList;