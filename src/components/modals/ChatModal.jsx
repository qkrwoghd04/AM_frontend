// ChatModal.jsx
import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import '../css/ChatModal.css';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const api_key = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(api_key);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContent = async (prompt) => {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 프롬프트에 응답 길이 제한 추가
      const enhancedPrompt = `${prompt} Explain in detail and make it easy to understand.`;

      setMessages(prev => [...prev, { role: 'user', content: prompt }]);
      setMessages(prev => [...prev, { role: 'ai', content: '' }]);

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = text;
        return newMessages;
      });

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'error',
        content: 'Sorry, something went wrong. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    generateContent(inputText);
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