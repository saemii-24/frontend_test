"use client";
import AllComponent from "@/components/AllComponent";
import Fetch from "@/components/Fetch";
import Memo from "@/components/Memo";
import { RequestAnimation } from "@/components/RequestAnimation";
import TodoList from "@/components/TodoList";
import Toggle from "@/components/Toggle";
import Animation from "@/components/Animation";
import ChatAnimation from "@/components/ChatAnimation";
import { UseModal } from "@/components/UseModal";
import ZustandComponent from "@/zustand/ZustandComponent";
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
      <UseModal />
      <ZustandComponent />
      <Animation />
      <ChatAnimation />
    </>
  );
}
