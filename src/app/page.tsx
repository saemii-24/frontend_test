"use client";
import { AComponent } from "@/components/AComponent";
import AllComponent from "@/components/AllComponent";
import { BComponent } from "@/components/BComponent";
import Fetch from "@/components/Fetch";
import Memo from "@/components/Memo";
import { RequestAnimation } from "@/components/RequestAnimation";
import TodoList from "@/components/TodoList";
import Toggle from "@/components/Toggle";
import { CountProvider } from "@/context/CountContext";
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
      <AllComponent />
      <RequestAnimation />
    </>
  );
}
