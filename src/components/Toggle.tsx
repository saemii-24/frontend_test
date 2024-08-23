"use client";
import React, { useState } from "react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      role="switch"
      onClick={toggle}
      aria-checked={isOn}
      className={`${
        isOn ? "bg-blue-500" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300`}
    >
      <span
        className={`${
          isOn ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-300`}
      />
    </div>
  );
}

export default Toggle;
