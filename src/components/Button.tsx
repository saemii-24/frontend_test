import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
}
const Button = ({ children }: ButtonProps) => {
  return (
    <button
      onClick={() => {
        alert("경고문 출력!");
      }}
    >
      {children ? children : "기본 버튼"}
    </button>
  );
};

export default Button;
