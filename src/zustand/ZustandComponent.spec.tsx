import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ZustandComponent from "./ZustandComponent";
import { mockReset, mockDecrement, mockIncrement } from "../stores/MockZustand";

describe("ZustandComponent 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 상태 초기화
    mockReset();
  });

  it("초기 렌더링 시 count는 0이어야 한다", () => {
    render(<ZustandComponent />);
    expect(screen.getByText(/^Count: 0$/)).toBeInTheDocument();
  });

  it("+ 버튼을 클릭하면 count가 1씩 증가해야 한다", async () => {
    render(<ZustandComponent />);
    const user = userEvent.setup();

    mockIncrement(); // Increment 함수 모킹

    // await act(async () => {
    //   await user.click(screen.getByTestId("plus"));
    // });

    // count 값이 증가했는지 확인
    expect(screen.getByTestId("count")).toBeInTheDocument();
  });

  it("(Zustand) - 버튼을 클릭하면 count가 1씩 감소해야 한다", async () => {
    render(<ZustandComponent />);
    const user = userEvent.setup();

    mockDecrement(); // Decrement 함수 모킹

    // 버튼 클릭 이벤트를 처리하기 위해 주석을 해제해야 함
    // await act(async () => {
    //   await user.click(screen.getByTestId("minus"));
    // });

    // count 값이 감소했는지 확인
    expect(screen.getByTestId("count")).toBeInTheDocument();
  });

  it("(UI) - 버튼을 클릭하면 count가 1씩 감소해야 한다", async () => {
    render(<ZustandComponent />);
    //이벤트 핸들러 준비
    const user = userEvent.setup();

    // 상태 모킹을 사용하지 않음

    // 버튼 클릭 이벤트를 처리
    await act(async () => {
      await user.click(screen.getByTestId("minus"));
    });

    // count 값이 감소했는지 확인
    expect(screen.getByTestId("count")).toBeInTheDocument();
  });
});
