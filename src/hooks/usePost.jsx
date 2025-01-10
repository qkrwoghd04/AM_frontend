import { useContext, useState, useEffect } from 'react'
import { PostStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

// 인자로 전달된 id가 가지고 있는 데이터 반환 훅
const usePost = (id) => {
  const data = useContext(PostStateContext);
  const [curPostItem, setCurPostItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentPostItem = data.find((item) => String(item.id) === String(id))

    if (!currentPostItem) {
      window.alert("존재하지 않는 포스트입니다");
      nav("/", { replace: true })
    }
    setCurPostItem(currentPostItem)

  }, [id])

  return curPostItem
}

export default usePost;