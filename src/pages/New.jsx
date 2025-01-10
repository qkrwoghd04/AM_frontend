import { useNavigate, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { PostDispatchContext } from "../App";
import { useContext } from "react";

// 포스트 생성
const New = () => {
  const nav = useNavigate()
  const location = useLocation();
  const { videoId } = location.state || {};
  const { onCreate } = useContext(PostDispatchContext)

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.logoId, input.videoId, input.content);
    nav("/", { replace: true })
  }
  return (
    <>
      <Header leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />} title={"새로운 포스트"} />
      <Editor onSubmit={onSubmit} videoId={videoId} />
    </>
  )
}

export default New;