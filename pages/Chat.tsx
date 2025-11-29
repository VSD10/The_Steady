import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useWallet } from '../context/WalletContext';

const Chat: React.FC = () => {
  const { theme, appMode } = useWallet();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hey! I'm THESTEADY. I noticed your earnings were great yesterday! Should we move ₹500 to your Shadow Wallet?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Switch to Joy Mode?",
    "Can I spend ₹200?",
    "Show predictions",
    "Why is money locked?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className={`flex items-center justify-between pb-4 border-b ${theme.border}`}>
        <div>
           <h1 className={`text-xl font-bold ${theme.textPrimary} flex items-center gap-2`}>
             THESTEADY Coach <Sparkles size={16} className="fill-current" style={{ color: theme.accentColor }} />
           </h1>
           <p className={`text-xs ${theme.textSecondary}`}>Always online • {appMode} Mode</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-gray-200' : theme.primaryButton
            }`}>
              {msg.role === 'user' ? <User size={14} className="text-gray-600" /> : <Bot size={14} className="text-white" />}
            </div>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gray-100 text-gray-800 rounded-br-none' 
                  : `${theme.iconBg} rounded-bl-none border ${theme.border}`
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.primaryButton}`}>
                <Bot size={14} className="text-white" />
             </div>
             <div className={`${theme.bgApp} p-3 rounded-2xl rounded-bl-none text-gray-400 text-sm`}>
                Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {quickPrompts.map((prompt, idx) => (
          <button 
            key={idx}
            onClick={() => {
              setInput(prompt);
            }}
            className={`whitespace-nowrap px-3 py-1.5 ${theme.bgPanel} border border-gray-200 rounded-full text-xs text-gray-600 hover:border-gray-400 transition`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className={`pt-2 -mx-4 px-4 pb-2`}>
        <div className={`flex items-center gap-2 ${theme.bgPanel} p-2 rounded-full shadow-sm border ${theme.border}`}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 outline-none text-gray-800"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition ${
              input.trim() ? theme.primaryButton : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
