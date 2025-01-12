import { youtubeApi } from '../api/youtubeApi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import './css/VideoList.css';
// 컴포넌트
import SearchBar from './SearchBar';
import Selector from './Selector'
import Button from './Button'
import Header from './Header'
// constant
import { getStorageVideoIds } from '../utils/storage';
import { Company_PlayList } from '../utils/constants';

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

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

    // Youtube Data API 사용해서 전부 가지고 오기 총 5번 반복
    try {
      setLoading(true);
      const allVideoIdPromises = Company_PlayList.map(async ({ company, playlistId }) => {
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
      // 필요한 형태로 데이터 변환
      const results = await Promise.all(allVideoIdPromises);
      const allVideoId = results.flat();

      console.log(allVideoId);
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

  // 검색 결과 필터링 - 새로운 로직
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
        <div className="FullscreenVideo">
          <Header title={"영상 글쓰기"} color={"white"} leftChild={<Button text={"< 뒤로가기"} onClick={() => setSelectedVideo(null)} />} />
          <div className="VideoOverlay">
            <iframe
              id="player"
              title="Selected Video"
              type="text/html"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1&fs=1`}
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0 }}
            ></iframe>
          </div>
          <Button text={"글쓰기"} onClick={() => nav("/new", { state: { videoId: selectedVideo } })} />
        </div>
      )}
      <div className='VideoTitle'>
        {searchKeyword ? (
          <h4>검색 결과: {searchKeyword}</h4>
        ) : (
          <h4>LG CNS AM 캠프 과정을 위한 {query} 영상</h4>
        )}
      </div>
      <div className='Video'>
        {/* searchKeyword가 있으면 searchResults를, 없으면 filteredCompanyName을 사용 */}
        {(searchKeyword ? searchResults : filteredCompanyName).map((v) => (
          <div
            key={v.id}
            className='VideoItem'
            onClick={() => handleVideoClick(v.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='VideoItem_Title'>
              <h4>{v.title}</h4>
            </div>
            <iframe
              id='player'
              title="랜덤 타이틀"
              type='text/html'
              src={`https://www.youtube-nocookie.com/embed/${v.id}`}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoList;