import './css/LogoItem.css'
import { getLogoImage } from '../utils/getLogoImage'

const LogoItem = ({ logoId, isSelected, onClick }) => {
  console.log(logoId, isSelected)
  return (
    <div onClick={onClick} className={`LogoItem ${isSelected ? `LogoItem_on_${logoId}` : ""}`}>
      <img className="logo_img" src={getLogoImage(logoId)} />
    </div>
  )
}

export default LogoItem