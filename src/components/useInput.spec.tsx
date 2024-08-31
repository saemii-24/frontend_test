import { renderHook, act } from "@testing-library/react";
import useInput from "./useInput";

describe("useInput hook 테스트", () => {
  // 'useInput hook'이라는 테스트 그룹을 정의
  it("주어진 초기값으로 초기화 되는가?", () => {
    // 주어진 초기 값으로 잘 초기화되는지 테스트
    // render Hook = 커스텀 훅을 테스트 환경에서 실행
    const { result } = renderHook(() => useInput("초기값 넣기")); // 훅을 렌더링하고 결과를 받아옴

    expect(result.current.value).toBe("초기값 넣기"); // 훅의 초기 값이 '초기값 넣기'인지 확인
  });

  it("onChange로 값이 업데이트 되는가?", () => {
    // onChange 호출 시 값이 업데이트되는지 테스트
    const { result } = renderHook(() => useInput("")); // 빈 문자열로 훅을 초기화하고 결과를 받아옴

    //act를 사용하면 모든 상태 변경이나 DOM 업데이트가 완료된 후에 테스트 코드가 실행됨 (즉 상태 업데이트가 모두 완료되도록 보장함.)
    act(() => {
      result.current.onChange({
        target: { value: "새로운 값으로 변경" },
      } as React.ChangeEvent<HTMLInputElement>); // onChange 이벤트를 통해 값을 '새로운 값으로 변경'로 변경
    });

    expect(result.current.value).toBe("새로운 값으로 변경"); // 값이 '새로운 값으로 변경'로 업데이트되었는지 확인
  });
});
