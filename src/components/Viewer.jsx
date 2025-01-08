import { getLogoImage } from '../utils/getLogoImage'
import { LogoList } from '../utils/constants'
import "./css/Viewer.css"

const Viewer = ({ logoId, content }) => {
  const logoItem = LogoList.find((item) => String(item.logoId) === String(logoId))
  return (
    <div className='Viewer'>
      <section className='img_section'>
        <h4>주제</h4>
        <div className={`logo_img_wrapper logo_img_wrapper_${logoId}`}>
          <img src={getLogoImage(logoId)} />
          <div>
            {logoItem.logoName}
          </div>
        </div>
      </section>
      <section className='content_section'>
        <h4>오늘의 배움</h4>
        <div className='content_wrapper'>
          <h5>{content}</h5>
        </div>
      </section>
    </div>
  )
}

export default Viewer