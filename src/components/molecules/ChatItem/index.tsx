import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

interface ChatProps {
  isMe?: boolean;
}

const ChatItem = ({isMe}: ChatProps) => {
  return isMe ? <IsMe /> : <Other />;
};

export default ChatItem;
