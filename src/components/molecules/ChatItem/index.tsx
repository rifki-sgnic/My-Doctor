import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

interface ChatProps {
  isMe?: boolean;
  text: string;
  date: string;
  photo?: any;
}

const ChatItem = ({isMe, text, date, photo}: ChatProps) => {
  return isMe ? (
    <IsMe text={text} date={date} />
  ) : (
    <Other text={text} date={date} photo={photo} />
  );
};

export default ChatItem;
