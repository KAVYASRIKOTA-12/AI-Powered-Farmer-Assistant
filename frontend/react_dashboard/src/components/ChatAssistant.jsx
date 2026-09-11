import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ChatAssistant = ({ selectedLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI Farming Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Update greeting when language changes
  useEffect(() => {
    if (selectedLanguage !== 'en' && messages.length === 1) {
      // Small hack to get a translated greeting if user switches right away
      const greet = async () => {
        try {
          const res = await api.post('/chatbot/ask', { message: 'hello', language: selectedLanguage });
          setMessages([{ text: res.data.response, sender: 'bot' }]);
        } catch (e) { console.error(e) }
      };
      greet();
    }
  }, [selectedLanguage]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.post('/chatbot/ask', {
        message: input,
        language: selectedLanguage
      });

      const { response: botText, action, target } = response.data;

      setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);

      // Handle Tool Routing (Navigation)
      if (action === 'navigate' && target) {
        setTimeout(() => {
          if (target === 'weather') navigate('/');
          if (target === 'disease') navigate('/disease');
          if (target === 'prices') navigate('/prices');
        }, 1500);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chat-panel glass-card"
          >
            <div className="chat-header" style={headerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={24} />
                <span style={{ fontWeight: '600' }}>AgriAI Expert</span>
              </div>
              <X size={20} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
            </div>

            <div className="chat-messages" style={messageAreaStyle}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ 
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#2e7d32' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#1b5e20',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  margin: '5px 0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <div style={{ fontSize: '12px', color: '#666' }}>Thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input" style={inputAreaStyle}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about crops, weather, or prices..."
                style={inputStyle}
              />
              <button onClick={handleSend} style={sendButtonStyle}><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chat-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </div>
    </div>
  );
};

const headerStyle = {
  padding: '15px',
  background: '#2e7d32',
  color: 'white',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const messageAreaStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column'
};

const inputAreaStyle = {
  padding: '15px',
  display: 'flex',
  gap: '10px',
  borderTop: '1px solid #eee'
};

const inputStyle = {
  flex: 1,
  border: '1px solid #ddd',
  borderRadius: '25px',
  padding: '10px 15px',
  outline: 'none',
  fontFamily: 'inherit'
};

const sendButtonStyle = {
  background: '#2e7d32',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '38px',
  height: '38px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
};

export default ChatAssistant;
