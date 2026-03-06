import { useEffect, useRef, useState } from 'react';
import { type Message } from '../utils/types';
import { jwtDecode } from 'jwt-decode';
import { type TokenPayload } from '../utils/types';
import { Button } from '@/components/ui/button';

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.ifelse.io');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    if (!socketRef.current) return;

    const message: Message = {
      id: crypto.randomUUID(),
      text: input,
      created_at: new Date().toISOString(),
    };

    socketRef.current.send(JSON.stringify(message));
    setInput('');
  }

  

  const token = localStorage.getItem('token');

  let username = 'Anonymous';

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    username = decoded.username;
  }

  return (
    <>
      <div className="bg-[#d5b0ac] p-4 w-screen h-screen"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
        <h2 className="bg-[#684551] text-white text-2xl text-center p-2 rounded-t-md">
          Write to the manager
        </h2>

        <div className="bg-[#cea0ae] h-96 overflow-y-auto p-4 mb-4 rounded-b-md wrap-break-word">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <div className="text-sm text-gray-700">
                <strong>{username}</strong>
                <span className="ml-2 text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            className="bg-[#684551] border border-white rounded-md p-2 text-white flex-1"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            type="submit"
            size="lg" variant="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
}

export default Chat;
