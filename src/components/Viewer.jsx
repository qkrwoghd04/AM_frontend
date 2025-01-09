import { getLogoImage } from '../utils/getLogoImage'
import "./css/Viewer.css"

const Viewer = ({ logoId, content, videoId }) => {

  return (
    <div className='Viewer'>
      <section className='img_section'>
        <h4>주제</h4>
        <div className={`logo_img_wrapper logo_img_wrapper_${logoId}`}>
          <img src={getLogoImage(logoId)} />
        </div>
      </section>
      {
        videoId !== ""
          ?
          <section className='video_section'>
            <h4>영상</h4>
            <iframe
              id="player"
              title="Selected Video"
              type="text/html"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&fs=1`}
              allowFullScreen
            ></iframe>
          </section>
          :
          null
      }
      <section className='content_section'>
        <h4>내용</h4>
        <div className='content_wrapper'>
          <h5>{content}</h5>
        </div>
      </section>
    </div>
  )
}

export default Viewer