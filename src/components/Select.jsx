import ReactSelect from 'react-select'

const options = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된 순' },
]

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    backgroundColor: state.isSelected ? 'rgb(49, 130, 239)' : 'white',
  }),
  control: (provided) => ({
    ...provided,
    width: 120
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: state.selectProps.myFontSize
  })
};

const Select = ({ onChange }) => {
  return (
    <ReactSelect
      styles={customStyles}
      onChange={onChange}
      options={options}
      defaultValue={options[0]}
    />
  )
}

export default Select