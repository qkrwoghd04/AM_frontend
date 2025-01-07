import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer'
import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../utils/getStringedDate';

const Post = () => {
  const param = useParams();
  const nav = useNavigate();


  const curDiaryItem = useDiary(param.id)

  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>
  }
  const { createdDate, logoId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate))


  return (
    <div>
      <Header title={title}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={<Button onClick={() => nav(`/edit/${param.id}`)} text={"수정하기"} />}
      />
      <Viewer logoId={logoId} content={content} />
    </div>
  )
}

export default Post