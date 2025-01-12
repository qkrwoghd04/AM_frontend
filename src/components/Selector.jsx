import './css/Selector.css'
import { getLogoImage } from '../utils/getLogoImage'
import { LogoList } from '../utils/constants'

const Selector = ({ setQuery, setSearchKeyword }) => {
  const onSearchCompany = (query) => {
    setQuery(query);
    setSearchKeyword("");
  }

  return (
    <div className="Selector">
      {
        LogoList.map((company, index) => {
          return (
            <button
              className={`SelectorBox SelectorBox_${company.logoId}`}
              key={index}
              onClick={() => onSearchCompany(company.logoName)}
            >
              <img src={getLogoImage(company.logoId)} alt={company.logoName} />
            </button>
          )
        })
      }
    </div>
  )
}

export default Selector