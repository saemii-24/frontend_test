"use client";
import React, { useState, useEffect } from "react";

export const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // 언마운트 시 타이머 해제
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p>타이머: {count}</p>
    </div>
  );
};
