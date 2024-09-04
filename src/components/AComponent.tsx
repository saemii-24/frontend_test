import React from "react";
import { useCount } from "../context/CountContext";

export const AComponent: React.FC = () => {
  const { count, increment } = useCount();

  return (
    <div className="p-4 bg-yellow-200">
      <h2>A Component</h2>
      <p>Count: {count}</p>
      <button onClick={increment} className="px-5 bg-orange-400">
        Increment
      </button>
    </div>
  );
};
