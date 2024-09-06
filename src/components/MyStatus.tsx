// AuthStatus.tsx
import React, { useState } from "react";

function Login() {
  return <h1>로그인 되었어요!</h1>;
}

function Logout() {
  return <h1>로그아웃 됐어요.</h1>;
}

const MyStatus = ({
  isLoggedIn,
  onToggle,
}: {
  isLoggedIn: boolean;
  onToggle: () => void;
}) => {
  return (
    <div>
      {isLoggedIn ? <Logout /> : <Login />}
      <button role="isLogin" onClick={onToggle}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

export default MyStatus;
