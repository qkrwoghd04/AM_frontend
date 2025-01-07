import { replace, useNavigate, useParams } from 'react-router-dom'

import Header from '../components/Header'
import Editor from '../components/Editor'
import Button from '../components/Button'
import { useContext, useState } from 'react'
import { DiaryDispatchContext } from '../App'
import useDiary from '../hooks/useDiary'

const Edit = () => {
  const param = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(param.id)


  const onClickDelete = () => {
    if (
      window.confirm("일기를 삭제하시겠습니까?")
    ) {
      onDelete(param.id);
      nav("/", replace(true));
    }
  }

  const onSubmit = (input) => {
    onUpdate(param.id, input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", replace(true))
  }

  return (
    <div>
      <Header
        leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)} />}
        title="일기 수정하기"
        rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />

    </div>
  )
}

export default Edit;