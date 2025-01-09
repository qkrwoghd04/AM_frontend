import './css/Header.css';

const Header = ({ title, leftChild, rightChild, color = "black" }) => {
  return (
    <header
      className={`Header Header_${color}`}
    >
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  )
}

export default Header;