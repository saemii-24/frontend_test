"use client";
import React, { useRef } from "react";

const Animation = () => {
  // boxRef의 타입을 명시적으로 HTMLDivElement | null로 설정
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 매 프레임마다 작동한다.
  const boxAnimation = () => {
    let start: null | number = null;
    const duration = 1000; // 1초 동안 애니메이션

    const animate = (timestamp: number) => {
      // timestamp = 함수가 각 프레임을 시작하는 위치
      if (!start) start = timestamp;
      const elapsed = timestamp - (start as number); // 애니메이션이 시작되고 경과된 시간

      // 박스를 오른쪽으로 200px 이동
      const progress = Math.min(elapsed / duration, 1); // progress는 0에서 1까지
      if (boxRef.current) {
        boxRef.current.style.transform = `translateX(${progress * 200}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate); // 애니메이션이 끝나지 않았다면 계속 호출
      }
    };

    requestAnimationFrame(animate); // 애니메이션 시작
  };

  return (
    <div>
      <button
        type="button"
        className="bg-red-200 p-2 mb-10"
        onClick={boxAnimation}
      >
        애니메이션 시작
      </button>
      <div
        ref={boxRef}
        className="w-20 h-20 bg-green-300"
        style={{ transform: "translateX(0px)" }}
        id="box"
      ></div>
    </div>
  );
};

export default Animation;
