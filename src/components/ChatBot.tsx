import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to Eco-Waste! This is Vivaan. How may I help you?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, isBot: false }]);
      setInputMessage('');
      
      // Simulate bot response after 1 second
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm here to help you with Eco-Waste related queries. Please let me know what you need!", 
          isBot: true 
        }]);
      }, 1000);
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    // Reset messages when opening chat
    if (!isOpen) {
      setMessages([{ text: "Welcome to Eco-Waste! This is Vivaan. How may I help you?", isBot: true }]);
      setInputMessage('');
    }
  };

  return (
    <>
      {/* Help-Bot Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleChat}
          className="cursor-pointer bg-black/30 backdrop-blur-md rounded-lg px-6 py-3 shadow-lg flex items-center gap-3"
          style={{
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}
        >
          <Bot className="w-8 h-8 text-red-500" />
          <h2 className="text-white text-2xl font-bold tracking-wider">
            Help-Bot
          </h2>
        </motion.div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            ref={overlayRef}
            className="fixed bottom-24 right-8 w-96 h-[500px] bg-black/30 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
              border: '1px solid rgba(255, 0, 0, 0.3)'
            }}
          >
            <div className="p-4 border-b border-red-500/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-red-500" />
                  <h3 className="text-red-500 text-xl font-bold tracking-wider">Help-Bot</h3>
                </div>
                <button
                  onClick={handleToggleChat}
                  className="text-red-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-4 h-[calc(100%-140px)] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.isBot ? 'text-red-500' : 'text-white'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-2">
                    {message.isBot && <Bot className="w-4 h-4" />}
                    {message.isBot ? 'Help-Bot' : 'You'}
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-red-500/20">
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-red-500/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded bg-black/30 backdrop-blur-sm text-white border border-red-500/30 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500/30 backdrop-blur-sm text-white rounded hover:bg-red-500/50 transition-colors flex items-center gap-2"
                  style={{
                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.2)'
                  }}
                >
                  <Bot className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 