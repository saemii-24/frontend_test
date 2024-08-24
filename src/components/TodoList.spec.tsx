import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  it("새로운 To-Do 항목을 추가할 수 있어야 한다", () => {
    render(<TodoList initialTodos={["초기 todo 항목 지정"]} />);

    const input = screen.getByPlaceholderText("todo를 적어주세요.");
    const addButton = screen.getByText("Add");

    // 입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    fireEvent.change(input, { target: { value: "테스트를 작성" } });
    fireEvent.click(addButton);

    // 추가된 항목이 화면에 표시되는지 확인
    expect(screen.getByText("테스트를 작성")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  it("addTodo 함수가 새로운 항목을 추가할 때 호출되는지 확인한다", () => {
    // addTodo 함수가 호출되는지 확인하기 위해 jest.fn()을 사용하여 mock 함수 생성
    const mockAddTodo = vi.fn();
    render(
      <TodoList initialTodos={["초기 todo 항목 지정"]} addTodo={mockAddTodo} />
    );

    const input = screen.getByPlaceholderText("todo를 적어주세요.");
    const addButton = screen.getByText("Add");

    // 입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    fireEvent.change(input, { target: { value: "스파이 테스트" } });
    fireEvent.click(addButton);

    // mockAddTodo 함수가 호출되었는지 확인
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("스파이 테스트");
  });
});
