import PostItem from "./PostItem";
import "./css/PostList.css";
import { useState } from 'react'
import MenuBar from "./MenuBar";


const PostList = ({ data }) => {
  const [sortType, setSortType] = useState('latest')

  const onChangeSortType = e => {
    setSortType(e.target.value)
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
      <MenuBar onChange={onChangeSortType} />
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