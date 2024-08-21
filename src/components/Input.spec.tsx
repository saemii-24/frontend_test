import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import Input from "./Input";
import { screen } from "@testing-library/dom";

describe("Input Component", () => {
  it("플레이스 홀더 props를 내려주면 props로 만들어진 placeholder를 보여준다.", () => {
    render(<Input placeholder="테스트용 placeholder" name="test" />);
    const inputNode = screen.getByPlaceholderText("테스트용 placeholder");
    expect(inputNode).toBeInTheDocument();
  });
});
