import React from "react";
import { useCount } from "../context/CountContext";

export const BComponent: React.FC = () => {
  const { count } = useCount();

  return (
    <div className="p-4 bg-blue-200">
      <h2>B Component</h2>
      <p>Count: {count}</p>
    </div>
  );
};
