import React, { createContext, useContext, useState, ReactNode } from "react";

// CountContext 타입 정의
interface CountContextType {
  count: number;
  increment: () => void;
}

// Context 생성
const CountContext = createContext<CountContextType | undefined>(undefined);

// Provider 컴포넌트
export const CountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <CountContext.Provider value={{ count, increment }}>
      {children}
    </CountContext.Provider>
  );
};

// Hook을 사용하여 Context 값 접근
export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};
