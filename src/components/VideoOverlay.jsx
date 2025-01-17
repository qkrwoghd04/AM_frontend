import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Button from './Button'

const VideoOverlay = ({ selectedVideo, setSelectedVideo }) => {
  const nav = useNavigate();
  return (
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
  )
}

export default VideoOverlay