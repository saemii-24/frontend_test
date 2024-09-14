import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Debug } from "./Debug";

describe("Debug component", () => {
  it("Debug 컴포넌트를 렌더링하고 Dom을 콘솔에 출력한다.", () => {
    // 컴포넌트를 렌더하고, debug()를 사용하여 DOM을 콘솔에 출력
    const { debug } = render(<Debug />);

    // debug() 호출하여 현재 DOM을 출력
    debug();

    // DOM에서 "Hello World" 텍스트가 존재하는지 확인 아래와 같이 출력된다.
    // <body>
    //   <div>
    //     <h1>Hello World</h1>
    //   </div>
    // </body>;
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
