import { useEffect, useState } from 'react'
import './css/Editor.css'
import LogoItem from './LogoItem'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { LogoList } from '../utils/constants'
import { getStringedDate } from '../utils/getStringedDate'

const Editor = ({ initData, onSubmit, videoId = "" }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    content: "",
    videoId: "",
  });

  const nav = useNavigate();

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value
    })
  }
  const onClickSubmitButton = () => {
    if (videoId !== "") {
      onSubmit({ ...input, videoId: videoId })
    }
    onSubmit(input)
  }

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate))
      })
    }
  }, [initData])

  return (
    <div className='Editor'>
      {/* 날짜 선택 */}
      <section className='date_section'>
        <h4>오늘의 날짜</h4>
        <input name="createdDate" onChange={onChangeInput} value={getStringedDate(input.createdDate)} type="date"></input>
      </section>
      {/* 로고 섹션 */}
      <section className='logo_section'>
        <h4>주제</h4>
        <div className='logo_list_wrapper'>
          {LogoList.map((item, index) => {
            return (
              <LogoItem
                key={index} {...item}
                isSelected={item.logoId === input.logoId}
                onClick={() => onChangeInput({
                  target: {
                    name: "logoId",
                    value: item.logoId
                  }
                })} />
            )
          })}
        </div>
      </section>
      {/* if videoId 비디오 섹션 */}
      {
        videoId !== ""
          ?
          <section className='video_section'>
            <h4>비디오</h4>
            <iframe
              id="player"
              title="Selected Video"
              type="text/html"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&fs=1`}
              allowFullScreen
            ></iframe>
          </section>
          : ""
      }
      {/* 컨텐트 */}
      <section className='content_section'>
        <h4>오늘의 배움</h4>
        <textarea name="content" value={input.content} onChange={onChangeInput} placeholder='오늘은 무엇을 배우셨나요?' />
      </section>

      <section className='button_section'>
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton} />
      </section>
    </div>
  )
}

export default Editor