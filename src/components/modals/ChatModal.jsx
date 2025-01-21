// ChatModal.jsx
import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, ArrowLeft } from "lucide-react";
import { generateContentFromGemini } from '../../utils/generateContentFromGemini';
import '../css/ChatModal.css';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    generateContentFromGemini(inputText, setMessages, setIsLoading);
    setInputText('');
  };

  return (
    <div className="modal-overlay">
      <div className="chat-container">
        <nav className="chat-nav">
          <button onClick={onClose} className="back-button">
            <ArrowLeft />
            <span>Back</span>
          </button>
          <h2>Chat with Gemini</h2>
        </nav>

        <div className="messages-area">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? <Loader2 className="loader" /> : <Send />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
