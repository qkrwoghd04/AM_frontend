import Button from "./Button";
import { useNavigate } from 'react-router-dom'
import './css/MenuBar.css'
import Select from './Select'

const MenuBar = ({ onChange }) => {
  const nav = useNavigate();

  const handleSelectChange = (selectedOption) => {
    onChange({ target: { value: selectedOption.value } });
  }

  return (
    <div className="MenuBar">
      <Select onChange={handleSelectChange} />
      <Button text={"새 지식 쓰기"} type={"POSITIVE"} onClick={() => nav("/new")} />
      <Button text={"영상 글쓰기"} type={"POSITIVE"} onClick={() => nav("/video")} />
    </div>
  )
}

export default MenuBar