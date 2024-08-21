import React from "react";

interface InputProps {
  placeholder: string;
  name: string;
}
const Input = ({ placeholder, name }: InputProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder ? placeholder : "내용을 입력해주세요"}
    />
  );
};

export default Input;
