"use client";
import React, { useRef } from "react";

const Animation = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const boxAnimation = () => {
    let start: null | number = null;
    const duration = 1000; // 1초 동안 애니메이션

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - (start as number); // 경과 시간

      const progress = Math.min(elapsed / duration, 1); // 0에서 1까지
      if (boxRef.current) {
        boxRef.current.style.transform = `translateX(${progress * 200}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  //반복해서 왔다갔다 하는 애니메이션
  const circleAnimation = () => {
    let start: number | null = null;
    const duration = 20000; // 애니메이션 지속 시간 2초
    let direction = 1; // 이동 방향: 1이면 오른쪽, -1이면 왼쪽
    let progress = 0; // 0에서 1까지의 진행 상태

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - (start as number);
      const totalProgress = Math.min(elapsed / duration, 1); // 0에서 1까지

      // progress가 증가하거나 감소하도록 설정
      progress += direction * totalProgress; // 현재 방향으로 진행 상태 변경

      // 진행 상태가 1에 도달하면 방향을 바꿉니다.
      if (progress >= 1) {
        direction = -1; // 왼쪽으로 이동
        progress = 1; // 1로 고정
        start = timestamp; // 새로운 시작 시간 초기화
      } else if (progress <= 0) {
        direction = 1; // 오른쪽으로 이동
        progress = 0; // 0으로 고정
        start = timestamp; // 새로운 시작 시간 초기화
      }

      // 원을 이동
      if (circleRef.current) {
        circleRef.current.style.transform = `translateX(${progress * 200}px)`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="bg-green-200 p-2 mb-10"
          onClick={boxAnimation}
        >
          박스 애니메이션 시작
        </button>
        <div
          ref={boxRef}
          className="w-20 h-20 bg-green-300"
          style={{ transform: "translateX(0px)" }}
          id="box"
        ></div>
        <button
          type="button"
          className="bg-blue-200 p-2 mb-10"
          onClick={circleAnimation}
        >
          원 애니메이션 시작
        </button>
        <div
          ref={circleRef}
          className="w-20 h-20 bg-blue-300"
          style={{ transform: "translateX(0px)" }}
          id="circle"
        ></div>
      </div>
    </>
  );
};

export default Animation;
