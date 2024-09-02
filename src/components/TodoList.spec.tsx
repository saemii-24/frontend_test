import { describe, it, expect, vi } from "vitest";
import TodoList from "../components/TodoList";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("TodoList Component", () => {
  it("새로운 To-Do 항목을 추가할 수 있어야 한다", () => {
    render(<TodoList initialTodos={["초기 todo 항목 지정"]} />);

    //스크린의 요소의 기준들로 DOM 요소를 찾는다 (ID 기준으로 찾는 getElementById)와 비슷하다고 보면 됨.
    const input = screen.getByPlaceholderText("todo를 적어주세요.");
    const addButton = screen.getByText("Add");

    //사용자의 행동을 시뮬레이션 한다.
    //입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    //fireEvent = DOM 요소에서 이벤트를 시뮬레이션하여 테스트
    //target = 이벤트가 발생한 DOM 요소 / input의 value를 작성함
    fireEvent.change(input, { target: { value: "테스트를 작성" } });
    //버튼을 클릭함
    fireEvent.click(addButton);

    // 추가된 항목이 화면에 표시되는지 확인
    //expect는 Jest의 assertion 함수를 사용하여, 특정 값이 예상한 값과 일치하는지 검증함.
    //toBeInTheDocument는 screen.getByText("테스트를 작성")로 찾은 요소가 실제로 문서에 존재하는지 확인함.
    expect(screen.getByText("테스트를 작성")).toBeInTheDocument();
    //role이 listitem인 것을 찾고, 이 것의 길이가 2여야 함을 나타냄
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  it("addTodo 함수가 새로운 항목을 추가할 때 호출되는지 확인한다", () => {
    // addTodo 함수가 호출되는지 확인하기 위해 jest.fn()을 사용하여 mock 함수 생성
    // 테스트에서 특정 함수의 동작을 가짜로 만들어서 테스트의 유연성을 높이고,
    // 실제 구현에 의존하지 않고도 원하는 결과를 검증하게 함
    const mockAddTodo = vi.fn();
    render(
      <TodoList initialTodos={["초기 todo 항목 지정"]} addTodo={mockAddTodo} />
      //addTodo를 사용하기 위해선 해당 컴포넌트에서도 props로 작성해주어야 함에 주의한다.
    );

    const input = screen.getByPlaceholderText("todo를 적어주세요.");
    const addButton = screen.getByText("Add");

    // 입력 필드에 텍스트를 입력하고 추가 버튼 클릭
    //사용자가 입력 필드에 텍스트를 입력하고 버튼을 클릭할 때 mockAddTodo가 호출
    fireEvent.change(input, { target: { value: "스파이 테스트" } });
    fireEvent.click(addButton);

    // mockAddTodo 함수가 호출되었는지 확인
    //mockAddTodo가 한 번 호출되었는지, 호출 시 인자로 "스파이 테스트"가 전달되었는지를 검증함
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("스파이 테스트");
  });
});
