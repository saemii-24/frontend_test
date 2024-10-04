"use client";
import React, { useEffect, useState } from "react";

interface Message {
  text: string;
  isMyMessage: boolean;
}

const ChatAnimation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false); // 타이핑 여부
  const [fullMessagesQueue, setFullMessagesQueue] = useState<string[]>([]); // 타이핑할 메시지들

  // 메시지 추가하는 함수
  const addMessage = () => {
    const nowMessageNum = Math.floor((messages.length + 2) / 2); // 현재 메시지 수 기반으로 숫자 생성
    const myMessage = `내가 ${nowMessageNum}번 째 메세지를 보냅니다.`;

    // 내 메시지 추가
    setMessages((prev) => [...prev, { text: myMessage, isMyMessage: true }]);

    // 상대방의 여러 메시지를 추가하기 위한 배열
    const responseMessages = [
      `상대방의 ${nowMessageNum}번째 응답입니다.`,
      "더 물어볼 말이 있으신가요?",
    ];

    // 타이핑 효과를 위해 메시지를 큐에 추가
    setFullMessagesQueue((prev) => [...prev, ...responseMessages]);
  };

  // useEffect로 메시지 큐 처리
  useEffect(() => {
    const handleMessagesQueue = () => {
      if (!isTyping && fullMessagesQueue.length > 0) {
        const message = fullMessagesQueue[0]; // 첫 번째 메시지 가져오기
        setIsTyping(true); // 타이핑 시작

        setMessages((prev) => [...prev, { text: message, isMyMessage: false }]); // 메시지 추가

        setFullMessagesQueue((prev) => prev.slice(1)); // 첫 번째 메시지를 큐에서 제거
        setIsTyping(false); // 타이핑 종료
      }
    };

    handleMessagesQueue();
  }, [fullMessagesQueue, isTyping]);

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
            {message.text.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`text-white inline-block opacity-0 animation-fade-in`}
                style={{
                  animationDelay: `${charIndex * 0.1}s`, // 글자마다 지연 시간 적용
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatAnimation;
