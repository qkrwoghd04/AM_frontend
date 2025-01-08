import { useState } from 'react'
import './css/SearchBar.css'
import Button from './Button';
const SearchBar = ({ setQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setQuery(inputValue);
  };
  return (
    <div className='SearchBar'>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder='ex) 파이썬' />
      <Button onClick={handleSearch} text="검색" type="POSITIVE" />
    </div>
  )
}

export default SearchBar