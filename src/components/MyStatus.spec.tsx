import { render, fireEvent, screen } from "@testing-library/react";
import MyStatus from "./MyStatus";
import { describe, it, expect, vi } from "vitest"; // vi를 사용합니다.

describe("My Status Component", () => {
  it("isLoggedIn이 true일 때 Logout이 렌더링 되는가?", () => {
    render(<MyStatus isLoggedIn={true} onToggle={vi.fn()} />);
    expect(screen.getByText("로그아웃")).toBeInTheDocument();
  });

  it("isLoggedIn이 false일 때 Login이 렌더링 되는가?", () => {
    render(<MyStatus isLoggedIn={false} onToggle={vi.fn()} />);
    expect(screen.getByText("로그인")).toBeInTheDocument();
  });

  it("버튼을 클릭하면 onToggle 함수가 호출되는가?", () => {
    const onToggle = vi.fn(); // vi.fn()을 사용합니다.
    render(<MyStatus isLoggedIn={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("isLogin"));
    expect(onToggle).toHaveBeenCalled();
  });
});

/*
state를 검증시도할 때 본 컴포넌트에서 실행할 수 있는 방법은 2가지가 있다.
1. 해당 state를 props로 관리하게 변경하고, 테스트도 props로 검사하는 법
2. state는 그 컴포넌트 내에서 useState로 관리하고, 클릭하면 기본 값에서 다음 설정
되어야 하는 값으로 변경되는지 확인한다.
*/
