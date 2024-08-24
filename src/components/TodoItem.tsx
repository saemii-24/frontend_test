"use client";
import React from "react";

interface TodoItemProps {
  item: string;
  index: number;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  index,
  handleDragStart,
  handleDragEnter,
  handleDragEnd,
}) => {
  return (
    <div
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragEnter={() => handleDragEnter(index)}
      onDragEnd={handleDragEnd}
      className="todo-item bg-gray-100 border border-gray-300 p-4 mb-2 cursor-grab active:cursor-grabbing"
    >
      {item}
    </div>
  );
};

export default TodoItem;
