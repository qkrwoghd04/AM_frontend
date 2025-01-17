import './css/LogoSelector.css'
import LogoItem from './LogoItem'
import { LogoList } from '../utils/constants'

const LogoSelector = ({ selectedLogo, onLogoSelect }) => {
  return (
    <div className="LogoSelector">
      {
        LogoList.map((company, index) => {
          return (
            <LogoItem
              key={index}
              isSelected={company.logoName === selectedLogo}
              onClick={() => onLogoSelect(company.logoName)}
              logoId={company.logoId}
            />
          )
        })
      }
    </div>
  )
}

export default LogoSelector