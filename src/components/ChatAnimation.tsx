"use client";
import React, { useState } from "react";

const ChatAnimation = () => {
  const [messages, setMessages] = useState<
    { text: string; isMyMessage: boolean }[]
  >([]);

  // 메시지 추가하는 함수
  const addMessage = () => {
    const nowMessageNum = messages.length + 1; // 현재 메시지 수 기반으로 숫자 생성
    const myMessage = `내가 ${nowMessageNum}번 째 메세지를 보냅니다.`;

    // 내 메시지 추가
    setMessages((prev) => [...prev, { text: myMessage, isMyMessage: true }]);

    // 상대방의 n번째 응답 추가
    setTimeout(() => {
      const yourResponseMessage = `상대방의 ${nowMessageNum}번째 응답입니다.`;
      setMessages((prev) => [
        ...prev,
        { text: yourResponseMessage, isMyMessage: false },
      ]);
    }, 500); // 내 메시지 후 0.5초 후에 상대방 메시지 추가
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
      </div>
    </div>
  );
};

export default ChatAnimation;
