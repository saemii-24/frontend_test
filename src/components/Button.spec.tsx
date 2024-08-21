import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button"; // 올바른 컴포넌트 경로

describe("Button Component", () => {
  test("children props를 내려주면 button에 표시된다", () => {
    render(<Button>테스트용 children</Button>);
    const buttonNode = screen.getByText("테스트용 children");
    expect(buttonNode).toBeInTheDocument();
  });

  test("click하면 alert가 표시되어야 한다", () => {
    //vi  함수 모킹 및 스파이 생성 (jest와 비슷한 역할)
    // 객체의 메서드에 스파이 생성, 메서드가 어떻게 호출되는지 모니터링
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Button />);

    const buttonNode = screen.getByRole("button");
    fireEvent.click(buttonNode); //fireEvent 이벤트 시뮬레이션

    expect(alertMock).toHaveBeenCalledWith("경고문 출력!");
    //matcher, DOM에 요소 있는지 확인
    //모의된 함수가 특정 인수로 호출되었는지 확인

    alertMock.mockRestore(); //스파이된 함수의 원래 구현을 복원
  });
});
