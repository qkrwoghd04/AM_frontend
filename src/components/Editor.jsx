import { useEffect, useState } from 'react'
import './css/Editor.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { LogoList } from '../utils/constants'
import { getStringedDate } from '../utils/getStringedDate'
import LogoSelector from './LogoSelector'

const Editor = ({ initData, onSubmit, videoId = "" }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    content: ["", "", ""],
    videoId: "",
    logoName: ""
  });

  const nav = useNavigate();

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
      setInput({
        ...input,
        [name]: value
      });
    } else if (name.startsWith('point')) {
      const index = parseInt(name.slice(-1));
      const newContent = [...input.content];
      newContent[index] = value;
      setInput({
        ...input,
        content: newContent
      });
    } else {
      setInput({
        ...input,
        [name]: value
      });
    }
  }

  const onClickSubmitButton = () => {
    if (input.content.some(point => !point.trim())) {
      alert('모든 학습 포인트를 작성해주세요!');
      return;
    }

    const updatedInput = {
      ...input,
      videoId: videoId,
      content: input.content.join('\n')
    };
    onSubmit(updatedInput);
  };

  const handleLogoSelect = (company) => {
    onChangeInput({
      target: {
        name: "logoName",
        value: company
      }
    });
  }


  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
        content: initData.content.split('\n')
      });
    }
  }, [initData]);

  console.log(input.logoName)

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
        <LogoSelector
          selectedLogo={input.logoName}
          onLogoSelect={handleLogoSelect}
        />
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
        <div className="content_list">
          {[0, 1, 2].map((index) => (
            <div key={index} className="content_list_wrapper">
              <span className="content_list_number">{index + 1}.</span>
              <input
                type="text"
                name={`point${index}`}
                value={input.content[index]}
                onChange={onChangeInput}
                placeholder={`학습 포인트 ${index + 1}`}
                maxLength={100}
              />
            </div>
          ))}
        </div>
      </section>


      <section className='button_section'>
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton} />
      </section>
    </div>
  )
}

export default Editor