import { render, screen, act } from "@testing-library/react";
import Path from "./Path";
import { vi } from "vitest";
import { usePathname } from "next/navigation";

// usePathname을 모킹하여 반환 값 설정
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

it("should display the mocked pathname and change on rerender", () => {
  // 초기 경로 설정
  (usePathname as vi.Mock).mockReturnValue("/some-route");

  // 컴포넌트 렌더링
  const { rerender } = render(<Path />); //리렌더링 수동으로 trigger 해줌

  screen.debug();

  // 화면에 '/some-route' 경로가 표시되는지 확인
  expect(screen.getByText("/some-route")).toBeInTheDocument();

  // 경로 변경
  act(() => {
    //리렌더링 비동기적으로 처리해줌
    (usePathname as vi.Mock).mockReturnValue("/new-route");
  });

  // 경로가 변경되었는지 확인
  rerender(<Path />);

  screen.debug();

  expect(screen.getByText("/new-route")).toBeInTheDocument();
});
