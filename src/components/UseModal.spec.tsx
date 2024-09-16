import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UseModal } from "./UseModal";

describe("Modal Component", () => {
  it("모달이 열리고 닫힐 때 DOM 변화 확인", () => {
    // 컴포넌트 렌더링
    const { getByTitle, asFragment } = render(<UseModal />);

    // 초기 렌더링 상태 저장 (모달이 없는 상태)
    const firstRender = asFragment();

    // 모달을 여는 버튼 클릭 (title="button")
    fireEvent.click(getByTitle("button"));

    // 모달이 열린 후 "모달 이랍니다!" 텍스트가 있는지 확인
    expect(screen.getByText("모달 이랍니다!")).toBeInTheDocument();

    // 모달이 열린 DOM 상태 저장
    const secondRender = asFragment();

    // 모달이 없는 상태와 열린 상태가 다른지 비교
    expect(firstRender).not.toEqual(secondRender);
  });

  it("모달이 언마운트 되는지 확인", () => {
    const { unmount, getByText } = render(<UseModal />);

    // 모달 열기
    fireEvent.click(getByText("모달 열기"));
    expect(screen.getByText("모달 창입니다!")).toBeInTheDocument();

    // 컴포넌트 언마운트
    unmount();

    // 모달이 언마운트된 후 DOM에 존재하지 않는지 확인
    expect(screen.queryByText("모달 창입니다!")).not.toBeInTheDocument();
  });
});
