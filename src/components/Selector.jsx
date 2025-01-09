import './css/Selector.css'
import { getLogoImage } from '../utils/getLogoImage'

const keywordList = [
  { id: 1, name: "React", value: "리액트" },
  { id: 2, name: "Springboot", value: "스프링부트" },
  { id: 3, name: "AWS", value: "aws클라우드" },
  { id: 4, name: "Docker", value: "도커" },
  { id: 5, name: "Programming Language", value: "프로그래밍 언어 추천" },
]

const Selector = ({ setQuery }) => {
  const onSearchKeyword = (query) => {
    setQuery(query);
  }

  return (
    <div className="Selector">
      {
        keywordList.map((keyword) => {
          return (
            <button
              className={`SelectorBox SelectorBox_${keyword.id}`}
              key={keyword.id}
              onClick={() => onSearchKeyword(keyword.value)}
            >
              <img src={getLogoImage(keyword.id)} alt={keyword.name} />
            </button>
          )
        })
      }
    </div>
  )
}

export default Selector