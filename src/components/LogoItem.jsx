import './css/LogoItem.css'
import { getLogoImage } from '../utils/getLogoImage'

const LogoItem = ({ logoId, logoName, isSelected, onClick }) => {
  return (

    <div onClick={onClick} className={`LogoItem ${isSelected ? `LogoItem_on_${logoId}` : ""}`}>
      <img className="logo_img" src={getLogoImage(logoId)} />
      <p className='logo_name'>{logoName}</p>
    </div>
  )
}

export default LogoItem