import React, { useState } from "react";

interface DebouncedInputProps {
  onDebouncedChange: (value: string) => void;
}

export function debounce(func: (...args: any[]) => void, delay: number) {
  // 타이머를 저장할 변수 선언
  let timeout: ReturnType<typeof setTimeout>;

  // 디바운스된 함수 반환
  return (...args: any[]) => {
    // 이전에 설정된 타이머가 있으면 취소 (연속 호출 시 이전 호출 무시)
    clearTimeout(timeout);

    // 새로운 타이머 설정, 지정된 지연 시간 후에 함수 호출
    timeout = setTimeout(() => {
      func(...args); // 지연 시간 후에 원래 함수 호출
    }, delay);
  };
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  onDebouncedChange,
}) => {
  const [value, setValue] = useState("");

  //사용자가 입력을 멈추고 500밀리초 동안 추가 입력이 없을 때 onDebouncedChange 함수가 호출
  const debouncedChangeHandler = debounce((newValue: string) => {
    onDebouncedChange(newValue);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedChangeHandler(e.target.value);
  };

  return (
    <input
      data-testid="debounced-input"
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
};
