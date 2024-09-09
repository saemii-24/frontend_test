import React, { useState } from "react";

// debounce 함수: 연속된 이벤트 호출을 지연시키는 역할
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  // 디바운스된 함수 반환
  return (...args: any[]) => {
    clearTimeout(timeout); // 이전 타이머 취소
    timeout = setTimeout(() => {
      func(...args); // 지연 후 원래 함수 실행
    }, delay);
  };
}

// Debounce 컴포넌트
export const Debounce = () => {
  const [value, setValue] = useState("");

  // 새로운 값이 들어왔을 때 호출되는 함수 (debounced)
  const onDebouncedChange = (newValue: string) => {
    console.log("Debounced value:", newValue); // 여기서 디바운스된 값 처리
  };

  // 디바운스된 이벤트 핸들러
  const debouncedChangeHandler = debounce((newValue: string) => {
    onDebouncedChange(newValue);
  }, 500);

  // 입력이 바뀔 때 호출되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // 상태 업데이트
    debouncedChangeHandler(e.target.value); // 디바운스된 함수 호출
  };

  return (
    <input
      data-testid="debounced-input"
      type="text"
      value={value}
      onChange={handleChange} // 입력 변경 시 핸들러 호출
    />
  );
};
