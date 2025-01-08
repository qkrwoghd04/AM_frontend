import Header from '../components/Header'
import Button from '../components/Button';
import { useState, useContext } from 'react'
import { PostStateContext } from '../App';

import PostList from '../components/PostList'

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime()
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime()

  return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
}
const Home = () => {
  const [pivotDate, setPivatDate] = useState(new Date());
  const data = useContext(PostStateContext);

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMouth = () => {
    setPivatDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  };
  const onDecreaseMouth = () => {
    setPivatDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  };

  return (
    <>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"◀"} onClick={onDecreaseMouth} />}
        rightChild={<Button text={"▶"} onClick={onIncreaseMouth} />}
      />
      <PostList data={monthlyData} />
    </>
  )
}

export default Home;