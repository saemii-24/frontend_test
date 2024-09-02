"use client";
import Fetch from "@/components/Fetch";
import Memo from "@/components/Memo";
import TodoList from "@/components/TodoList";
import Toggle from "@/components/Toggle";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Toggle />
      <TodoList />
      <Fetch />
      <Memo
        onClick={() => {
          setCount(count + 1); // count를 1씩 증가시킴
        }}
        count={count}
      />
    </>
  );
}
