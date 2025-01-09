import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer'
import usePost from '../hooks/usePost';
import { getStringedDate } from '../utils/getStringedDate';

const Post = () => {
  const param = useParams();
  const nav = useNavigate();


  const curPostItem = usePost(param.id)

  if (!curPostItem) {
    return <div>데이터 로딩중...!</div>
  }
  const { createdDate, logoId, videoId, content } = curPostItem;
  const title = getStringedDate(new Date(createdDate))


  return (
    <div>
      <Header title={title}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={<Button onClick={() => nav(`/edit/${param.id}`)} text={"수정하기"} />}
      />
      <Viewer logoId={logoId} content={content} videoId={videoId} />
    </div>
  )
}

export default Post