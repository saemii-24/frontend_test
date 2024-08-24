"use client";
import React, { useState } from "react";

interface TodoListProps {
  initialTodos?: string[];
  addTodo?: (task: string) => void; // addTodo를 optional prop으로 정의
}

const TodoList: React.FC<TodoListProps> = ({
  initialTodos = ["공부하기"],
  addTodo,
}) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const handleAddClick = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
      if (addTodo) {
        addTodo(newTodo); // addTodo prop이 제공되면 호출
      }
    }
  };

  return (
    <div>
      <input
        placeholder="todo를 적어주세요."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
