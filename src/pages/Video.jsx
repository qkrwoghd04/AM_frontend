import Header from '../components/Header';
import Button from '../components/Button'

import VideoList from '../components/VideoList'
import { useNavigate } from 'react-router-dom';

// 영상 글쓰기
const Video = () => {
  const nav = useNavigate();
  return (
    <>
      <Header leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />} title={"관련 영상"} />
      <VideoList />
    </>
  )
}

export default Video