import { describe, it, vi, expect } from "vitest";
import { debounce } from "./Debounce";

//컴포넌트가 아닌 함수를 검증하고자 함
describe("debounce function", () => {
  it("특정 시간 이후에 함수가 호출 되어야 함", () => {
    vi.useFakeTimers(); // 가짜 타이머 설정

    const func = vi.fn(); // 호출을 감지하기 위한 목적으로 mock 함수 생성
    const debouncedFunc = debounce(func, 5000); // 5초 지연 설정

    // 함수를 호출하지만, 지연 시간 전에 func는 호출되지 않아야 함
    debouncedFunc();

    expect(func).not.toHaveBeenCalled(); // 아직 호출되지 않음

    // 5초가 지나면 함수가 호출되어야 함
    vi.advanceTimersByTime(5000);

    expect(func).toHaveBeenCalled(); // 5초 후 함수가 호출됨

    vi.useRealTimers(); // 타이머를 실제로 되돌림
    /*
    테스트 환경에서 시간이 가짜로 제어되고 있기 때문에, 타이머를 원래 상태로 돌려놓지 않으면 이후의 테스트들이 제대로 동작하지 않을 수 있다.
    */
  });

  it("딜레이 시간 이전에 다시 함수가 호출되면 이전 타이머가 리셋된다.", () => {
    vi.useFakeTimers();

    const func = vi.fn();
    const debouncedFunc = debounce(func, 5000);

    // 첫 번째 호출
    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    // 2초 후 다시 호출, 타이머가 리셋되어야 함
    vi.advanceTimersByTime(2000);
    debouncedFunc(); // 다시 호출되면 이전 타이머는 취소되고 새 타이머가 시작됨

    // 5초 이내이므로 func는 여전히 호출되지 않아야 함
    expect(func).not.toHaveBeenCalled();

    // 5초 지나면 호출됨 (두 번째 호출 기준 5초)
    vi.advanceTimersByTime(5000);
    expect(func).toHaveBeenCalledTimes(1); // 한 번만 호출되어야 함

    vi.useRealTimers();
  });
});
