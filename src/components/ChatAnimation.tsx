"use client";
import React, { useState } from "react";

interface Message {
  text: string;
  isMyMessage: boolean;
}

const ChatAnimation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingMessage, setTypingMessage] = useState(""); // 타이핑 중인 메시지
  const [isTyping, setIsTyping] = useState(false); // 타이핑 여부
  const [fullMessage, setFullMessage] = useState(""); // 현재 타이핑할 전체 메시지

  // 메시지 추가하는 함수
  const addMessage = () => {
    const nowMessageNum = Math.floor((messages.length + 2) / 2); // 현재 메시지 수 기반으로 숫자 생성
    const myMessage = `내가 ${nowMessageNum}번 째 메세지를 보냅니다.`;

    // 내 메시지 추가
    setMessages((prev) => [...prev, { text: myMessage, isMyMessage: true }]);

    // 상대방의 n번째 응답 추가
    setTimeout(() => {
      const yourResponseMessage = `상대방의 ${nowMessageNum}번째 응답입니다.`;
      setFullMessage(yourResponseMessage);
      simulateTypingEffect(yourResponseMessage); // 타이핑 효과 시작
    }, 500); // 내 메시지 후 0.5초 후에 상대방 메시지 추가
  };

  // 타이핑 효과 함수
  const simulateTypingEffect = (message: string) => {
    setIsTyping(true);
    setTypingMessage(""); // 초기화
    let charIndex = 0;

    const interval = setInterval(() => {
      // 현재 fullMessage 길이 체크 후 한 글자씩 추가
      setTypingMessage((prev) => prev + message[charIndex]);
      charIndex++;

      if (charIndex >= message.length) {
        clearInterval(interval);
        setIsTyping(false);
        // 타이핑 완료 후 메시지 추가
        setMessages((prev) => [...prev, { text: message, isMyMessage: false }]);
      }
    }, 100); // 100ms마다 한 글자씩 추가
  };

  return (
    <div className="w-[800px]">
      <button
        type="button"
        className="bg-red-200 p-2 mb-10"
        onClick={addMessage}
      >
        메시지 추가
      </button>
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[250px] p-4 m-2 ${
              message.isMyMessage
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-600 text-white self-start"
            }`}
          >
            {message.text}
          </div>
        ))}

        {/* 상대방의 메시지가 타이핑 중일 때 표시 */}
        {isTyping && (
          <div className="max-w-[250px] p-4 m-2 bg-gray-600 text-white self-start">
            {typingMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAnimation;
