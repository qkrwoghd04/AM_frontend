import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { PostDispatchContext } from "../App";
import { useContext } from "react";

const New = () => {
  const nav = useNavigate()
  const { onCreate } = useContext(PostDispatchContext)

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.logoId, input.content);
    nav("/", { replace: true })
  }
  return (
    <>
      <Header leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />} title={"새로운 포스트"} />
      <Editor onSubmit={onSubmit} />
    </>
  )
}

export default New;