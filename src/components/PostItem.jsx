import { getLogoImage } from "../utils/getLogoImage";
import { useNavigate } from "react-router-dom";
import "./css/PostItem.css";

const DiaryItem = ({ id, createdDate, logoId, content }) => {

  const nav = useNavigate();
  return (
    <div className="PostItem">
      <div
        onClick={() => nav(`/post/${id}`)}
        className={`img_section img_section_${logoId}`}>
        <img src={getLogoImage(logoId)} />
      </div>
      <div
        onClick={() => nav(`/post/${id}`)}
        className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      {/* <div className="button_section">
        <Button text={"수정하기"} onClick={() => nav(`/edit/${id}`)} />
      </div> */}
    </div>
  )
}

export default DiaryItem;