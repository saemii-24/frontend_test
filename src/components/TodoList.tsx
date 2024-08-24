// src/components/TodoList.tsx
import React, { useState } from "react";

interface TodoListProps {
  initialTodos?: string[]; // initialTodos prop을 정의합니다.
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState<string[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = (todo: string) => {
    if (todo.trim().length === 0) return;
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddClick = () => {
    addTodo(newTodo);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Add a new task"
        value={newTodo}
        onChange={handleInputChange}
        className="border rounded px-2 py-1"
      />
      <button
        onClick={handleAddClick}
        className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
      >
        Add
      </button>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} role="listitem" className="py-1">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
