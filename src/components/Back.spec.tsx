import { render, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Back } from "./Back";
import { useRouter } from "next/router";

// useRouter 모킹
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe("Back Component", () => {
  it("버튼을 클릭하면 userRouter의 back이 호출되어야 한다.", () => {
    // useRouter 모킹 구현
    const backMock = vi.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: backMock });

    const { getByText } = render(<Back />);

    // 버튼 클릭 이벤트 발생
    fireEvent.click(getByText("뒤로 가기"));

    // router.back이 호출되었는지 확인
    expect(backMock).toHaveBeenCalled();
  });
});
