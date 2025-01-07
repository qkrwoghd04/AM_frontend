import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Post from './pages/Post';
import Notfound from './pages/Notfound';
import Edit from './pages/Edit';

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case 'INIT': return action.data
    case 'CREATE': {
      nextState = [action.data, ...state]
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id))
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("post", JSON.stringify(nextState))
  return nextState
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("post");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData)
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return
    }

    let maxId = 0;
    parsedData.forEach(item => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    });

    idRef.current = maxId + 1;
    dispatch({
      type: "INIT",
      data: parsedData
    })
    setIsLoading(false);
  }, [])

  localStorage.removeItem("test")

  const onCreate = (createdDate, logoId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        logoId,
        content
      }
    })
  }
  const onUpdate = (id, createdDate, logoId, content) => {
    dispatch(
      {
        type: "UPDATE",
        data: {
          id,
          createdDate,
          logoId,
          content
        }
      }
    )
  }
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }

  if (isLoading) {
    return <div>데이터 로딩중 입니다...</div>
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate, onDelete, onUpdate
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
