// src/__tests__/TodoList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // UI 테스트
  it("새로운 To-Do 항목을 추가할 수 있어야 한다", () => {
    render(<TodoList initialTodos={["Initial Task"]} />);

    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    // 입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    fireEvent.change(input, { target: { value: "Write Tests" } });
    fireEvent.click(addButton);

    // 추가된 항목이 화면에 표시되는지 확인
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(2); // 초기 항목 + 추가된 항목
  });

  // 함수 호출 테스트
  it("addTodo 함수가 새로운 항목을 추가할 때 호출되는지 확인한다", () => {
    // TodoList의 addTodo 메서드를 스파이
    const addTodoSpy = vi.spyOn(TodoList.prototype as any, "addTodo");

    render(<TodoList initialTodos={["Initial Task"]} />);

    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    // 입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    fireEvent.change(input, { target: { value: "Test Spy" } });
    fireEvent.click(addButton);

    // addTodo 함수가 호출되었는지 확인
    expect(addTodoSpy).toHaveBeenCalledTimes(1);
    expect(addTodoSpy).toHaveBeenCalledWith("Test Spy");

    addTodoSpy.mockRestore(); // 스파이 제거 (원래 동작 복원)
  });
});
