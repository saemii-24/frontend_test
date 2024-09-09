import React, { useState } from "react";

// debounce 함수: 연속된 이벤트 호출을 지연시키는 역할
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout); // 이전 타이머 취소
    timeout = setTimeout(() => {
      func(...args); // 지연 후 원래 함수 실행
    }, delay);
  };
}

// Debounce 컴포넌트
export const Debounce = () => {
  const [value, setValue] = useState(""); // 입력된 값
  const [debouncedValue, setDebouncedValue] = useState(""); // 디바운스된 값

  // 디바운스된 이벤트 핸들러
  const debouncedChangeHandler = debounce((newValue: string) => {
    setDebouncedValue(newValue); // 디바운스된 값을 상태에 저장
  }, 5000); // 5000ms = 5초

  // 입력이 바뀔 때 호출되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // 상태 업데이트
    debouncedChangeHandler(e.target.value); // 디바운스된 함수 호출
  };

  return (
    <div>
      <input
        data-testid="debounced-input"
        type="text"
        value={value}
        onChange={handleChange} // 입력 변경 시 핸들러 호출
      />
      <p>디바운스된 값: {debouncedValue}</p> {/* 디바운스된 값 표시 */}
    </div>
  );
};
