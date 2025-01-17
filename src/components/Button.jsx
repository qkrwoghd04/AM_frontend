import "./css/Button.css";
import { motion } from "motion/react";

const Button = ({ text, type, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`Button Button_${type}`}>
      {text}
    </motion.button>
  )
}

export default Button;