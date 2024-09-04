import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AllComponent from "./AllComponent";

describe("All Component의 Context API", () => {
  it("A 컴포넌트에서 count를 증가시키면, B 컴포넌트에서도 count가 업데이트 된다.", () => {
    // App 컴포넌트 렌더링
    render(<AllComponent />);

    // A와 B 컴포넌트에서 초기 count가 0인지 확인
    const aCount = screen.getByText(/Count: 0/i, { selector: "p" });
    const bCount = screen.getByText(/Count: 0/i, { selector: "p" });

    // A 컴포넌트의 Increment 버튼 클릭
    fireEvent.click(screen.getByText(/Increment/i));

    // A 컴포넌트의 count가 1로 업데이트 되었는지 확인
    expect(aCount).toHaveTextContent("Count: 1");

    // B 컴포넌트의 count도 1로 업데이트 되었는지 확인
    expect(bCount).toHaveTextContent("Count: 1");
  });
});
