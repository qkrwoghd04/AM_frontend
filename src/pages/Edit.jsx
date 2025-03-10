import { replace, useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'
import Editor from '../components/Editor'
import Button from '../components/Button'
import { useContext } from 'react'
import { PostDispatchContext } from '../App'
import usePost from '../hooks/usePost'

// 포스트 수정
const Edit = () => {
  const param = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(PostDispatchContext);

  const curDiaryItem = usePost(param.id);


  const onClickDelete = () => {
    if (
      window.confirm("포스팅을 삭제하시겠습니까?")
    ) {
      onDelete(param.id);
      nav("/", replace(true));
    }
  }

  const onSubmit = (input) => {
    onUpdate(param.id, input.createdDate.getTime(), input.logoId, input.videoId, input.content);
    nav("/", replace(true))
  }

  if (!curDiaryItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)} />}
        title="포스팅 수정하기"
        rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} videoId={curDiaryItem.videoId} />

    </div>
  )
}

export default Edit;