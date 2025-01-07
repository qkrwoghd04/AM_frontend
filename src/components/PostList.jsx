import Button from "./Button";
import { useNavigate } from 'react-router-dom'
import PostItem from "./PostItem";
import "./css/PostList.css";
import { useState } from 'react'


const PostList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState('latest')

  const onChangeSortType = e => {
    setSortType(e.target.value)
    console.log(e.target.value)
  }

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    })
  }

  const sortedDate = getSortedDate()
  return (
    <div className="PostList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button text={"새 지식 쓰기"} type={"POSITIVE"} onClick={() => nav("/new")} />
      </div>
      <div className="list_wrapper">
        {sortedDate.map((item) => {
          return (
            <PostItem key={item.id} {...item} />
          )
        })}
      </div>
    </div>
  )
}

export default PostList;