// useInput 훅을 사용하는 컴포넌트
import React from "react";
import useInput from "./useInput";

const MyForm: React.FC = () => {
  // useInput 훅을 호출하여 입력 필드의 상태를 관리
  // ""은 useInput의 initialValue 값으로 설정됨
  // nameInput은 value와 onChange가 담겨있는 객체가 됨

  const nameInput = useInput(""); // 초기값은 빈 문자열

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Submitted value: ${nameInput.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        {...nameInput} // useInput 훅의 반환값을 props로 spread (value, onChange)
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
