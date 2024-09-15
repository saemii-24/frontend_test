import { render, screen, waitFor } from "@testing-library/react";
import { Timer } from "./Timer";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Timer Component", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // 각 테스트마다 가상 타이머 설정
  });

  afterEach(() => {
    vi.useRealTimers(); // 각 테스트가 끝난 후 실제 타이머 복원
  });

  it("시간이 흐를 때 카운트가 증가해야 한다.", async () => {
    const { asFragment } = render(<Timer />);

    const firstRender = asFragment(); // 초기 렌더링 상태 저장

    expect(screen.getByText(/타이머: 0/)).toBeInTheDocument();

    // 2초 가상 시간 흐름
    vi.advanceTimersByTime(2000);

    // 비동기적으로 상태 업데이트를 기다립니다.
    await waitFor(() => {
      expect(screen.getByText(/타이머: 2/)).toBeInTheDocument();
    });

    const secondRender = asFragment(); // 변경된 상태 저장

    // 처음과 두 번째 렌더링 비교 (상태가 변경되었는지 확인)
    expect(firstRender).not.toEqual(secondRender);
  });

  it("타이머가 적절히 언마운트 되는가", () => {
    const { unmount } = render(<Timer />);

    // 컴포넌트 언마운트
    unmount();

    // 타이머가 해제되었기 때문에 더 이상 업데이트가 발생하지 않아야 함
    vi.advanceTimersByTime(2000); // 2초 가상 시간 흐름
    expect(screen.queryByText(/타이머:/)).not.toBeInTheDocument();
  });
});
