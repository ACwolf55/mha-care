
import React, { useEffect, useState } from 'react';
import { Avatar } from '@twilio-paste/core';
import {
  ChatAttachment,
  ChatAttachmentDescription,
  ChatAttachmentLink,
  ChatBookend,
  ChatBookendItem,
  ChatBubble,
  ChatEvent,
  ChatLogger,
  ChatMessage,
  ChatMessageMeta,
  ChatMessageMetaItem,
  ChatLog,
} from '@twilio-paste/chat-log';
import { RouterOutputs, api } from "~/utils/api";

// Define the Message type
type Message = {
  sender: string;
  text: string;
  time: string;
};

const ChatTest = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch initial chat messages
      const initialMessages = await api.messages.fetch();
      setMessages(initialMessages);




    // Subscribe to new chat messages
    const chatSubscription = trpc.messages.subscribe((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Cleanup: unsubscribe from chat messages
      chatSubscription.unsubscribe();
    };
  }, [trpc]);

  const sendMessage = async (text: string) => {
    // Send the message to the TRPC API
    await trpc.messages.send(text);
  };

  return (
    <div>
      <ChatLog>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            variant={message.sender === 'you' ? 'outbound' : 'inbound'}
          >
            <ChatBubble>{message.text}</ChatBubble>
            <ChatMessageMeta
              aria-label={`said by ${message.sender} at ${message.time}`}
            >
              <ChatMessageMetaItem>
                <Avatar name={message.sender} size="sizeIcon20" />
                {message.sender} ・ {message.time}
              </ChatMessageMetaItem>
            </ChatMessageMeta>
          </ChatMessage>
        ))}
      </ChatLog>
    </div>
  );
};

export default ChatTest;

