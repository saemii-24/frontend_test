import Fetch from "@/components/Fetch";
import TodoList from "@/components/TodoList";
import Toggle from "@/components/Toggle";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Toggle />
      <TodoList />
      <Fetch />
    </>
  );
}
