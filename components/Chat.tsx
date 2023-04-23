import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button } from './Button';
import { ChatLine, LoadingChatLine, type Message } from './ChatLine';

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3';
import { Textarea } from '@mantine/core';
import { Card } from "@mantine/core";


// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: 'bot',
    message: 'would you like to take a turing test?',
  },
];

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-6 flex clear-both">
    
    <Textarea
     
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input);
          setInput('');
        }
      }}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput('');
      }}
    >
      Say
    </Button>
    
  </div>
);

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);
  
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [...messages, { message, who: 'user' } as Message];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });
    const data = await response.json();

    // strip out white spaces from the bot message
    const botNewMessage = data.text.trim();

    setMessages([...newMessages, { message: botNewMessage, who: 'bot' } as Message]);
    setLoading(false);
  };

  return (
   
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
     
        
      
      {messages.map(({ message, who }, index) => (
        <ChatLine key={index} who={who} message={message} />
      ))}
        </Card.Section>
      {loading && <LoadingChatLine />}

      {messages.length < 2 && (
        <span className="mx-auto flex flex-grow text-gray-600 clear-both">
          Type a message to start the conversation
        </span>
      )}
      <InputMessage input={input} setInput={setInput} sendMessage={sendMessage} />
    </Card>
  );
}
