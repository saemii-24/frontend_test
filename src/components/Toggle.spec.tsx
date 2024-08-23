import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle";

describe("Toggle Component", () => {
  test("초기 렌더링이 올바르게 되었는지 확인한다.", () => {
    render(<Toggle />);

    // 초기 상태가 off인지 확인
    const toggleElement = screen.getByRole("switch");
    expect(toggleElement).toHaveAttribute("aria-checked", "false");
    expect(toggleElement).toHaveClass("bg-gray-300");
    expect(toggleElement.firstChild).toHaveClass("translate-x-1");
  });

  test("클릭하면 state가 변경되어야 한다.", () => {
    render(<Toggle />);

    // 버튼 클릭
    const toggleElement = screen.getByRole("switch");
    fireEvent.click(toggleElement);

    // 클릭 후 상태가 on으로 변경되었는지 확인
    expect(toggleElement).toHaveAttribute("aria-checked", "true");
    expect(toggleElement).toHaveClass("bg-blue-500");
    expect(toggleElement.firstChild).toHaveClass("translate-x-6");
  });
});
