import React, { useState, ChangeEvent, FormEvent } from 'react';

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/your-twilio-function-url', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Message sent successfully.');
        // Handle success
      } else {
        console.error('Error sending message.');
        // Handle error
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default MessageForm;

