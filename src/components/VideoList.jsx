// import { youtubeApi } from '../api/youtubeApi';
import { useEffect, useState } from 'react';
import './css/VideoList.css';
import SearchBar from './SearchBar';
import Selector from './Selector'
import Button from './Button'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const list = [
  {
    id: { videoId: "LclObYwGj90" },
    snippet: {
      title: "첫 번째 개발자 영상입니다 일부로 길게",
    }
  },
  {
    id: { videoId: "omYLzgtBaKU" },
    snippet: {
      title: "두 번째 개발자 영상",
    }
  },
  {
    id: { videoId: "FvRtoViujGg" },
    snippet: {
      title: "세 번째 개발자 영상",
    }
  }
];

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    setVideoList(list)
    // getYoutubeVideos();
  }, [query]);

  // const getYoutubeVideos = async () => {
  //   try {
  //     const res = await youtubeApi.get('search', {
  //       params: {
  //         part: 'id',
  //         maxResults: 1,
  //         q: query || '좋은 개발자란',
  //         type: 'video',
  //         // fields: 'items/id/videoId'
  //       },
  //     });
  //     console.log(res.data.items);
  //     setVideoList(res.data.items);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <Selector setQuery={setQuery} />
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
        <h4>LG CNS AM 캠프 과정을 위한 {query} 영상</h4>
      </div>
      <div className='Video'>
        {videoList.map((v) => (
          <div
            key={v.id.videoId}
            className='VideoItem'
            onClick={() => handleVideoClick(v.id.videoId)}
            style={{ cursor: 'pointer' }}
          >
            <div className='VideoItem_Title'>
              <h4>{v.snippet.title}</h4>
            </div>
            <iframe
              id='player'
              title={v.snippet.title}
              type='text/html'
              src={`https://www.youtube-nocookie.com/embed/${v.id.videoId}`}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoList;