import { useEffect, useState } from 'react'
import './css/Editor.css'
import LogoItem from './LogoItem'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { LogoList } from '../utils/constants'
import { getStringedDate } from '../utils/getStringedDate'

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    content: "",
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
      <section className='date_section'>
        <h4>오늘의 날짜</h4>
        <input name="createdDate" onChange={onChangeInput} value={getStringedDate(input.createdDate)} type="date"></input>
      </section>
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
        {/* 컨텐트 */}
      </section>
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