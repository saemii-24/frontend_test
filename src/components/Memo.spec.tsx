import React from "react";
import { render, screen } from "@testing-library/react";
import Memo from "./Memo";
import { vi } from "vitest";

describe("Memo Component", () => {
  it("props에 의해 count가 올바르게 렌더링 되는가?", () => {
    render(<Memo count={10} />);
    expect(screen.getByText("Count: 10")).toBeInTheDocument();
  });

  it("orops가 같으면 리렌더링 되지 않는다.", () => {
    const renderSpy = vi.fn();

    const { rerender } = render(<Memo count={10} onClick={renderSpy} />);

    // 처음 렌더링에서 count가 10일 때
    expect(screen.getByText("Count: 10")).toBeInTheDocument();
    expect(renderSpy).toHaveBeenCalledTimes(0);

    // 동일한 props로 다시 렌더링
    rerender(<Memo count={10} onClick={renderSpy} />);

    // 메모이제이션에 의해 다시 렌더링되지 않음
    expect(renderSpy).toHaveBeenCalledTimes(0);
  });

  it("props가 변경되면 리렌더링 되어야 한다.", () => {
    const { rerender } = render(<Memo count={10} />);

    // 처음 렌더링에서 count가 10일 때
    expect(screen.getByText("Count: 10")).toBeInTheDocument();

    // count prop이 20으로 변경될 때
    rerender(<Memo count={20} />);

    // 새로운 count 값이 반영됨
    expect(screen.getByText("Count: 20")).toBeInTheDocument();
  });
});
