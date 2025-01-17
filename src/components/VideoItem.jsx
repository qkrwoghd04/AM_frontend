import './css/VideoItem.css'

const VideoItem = ({ videoInfo, handleVideoClick }) => {
  return (
    <div
      key={videoInfo.id}
      className='VideoItem'
      onClick={() => handleVideoClick(videoInfo.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className='VideoItem_Title'>
        <h4>{videoInfo.title}</h4>
      </div>
      <iframe
        id='player'
        title="랜덤 타이틀"
        type='text/html'
        src={`https://www.youtube-nocookie.com/embed/${videoInfo.id}`}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default VideoItem