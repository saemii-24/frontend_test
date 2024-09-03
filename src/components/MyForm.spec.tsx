import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyForm from "./MyForm";

describe("MyForm Component", () => {
  it("name 필드를 작성하지 않을 경우 에러 메시지를 출력한다.", async () => {
    render(<MyForm />);

    // act 함수: 상태 업데이트가 발생한 후에 모든 작업이 완료될 때까지 기다리도록 보장함
    await act(async () => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(
      await screen.findByText("이름은 필수 항목 입니다.")
    ).toBeInTheDocument();
  });

  it("email 필드를 작성하지 않을 경우 에러 메세지를 출력한다.", async () => {
    render(<MyForm />);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(
      await screen.findByText("이메일은 필수 항목 입니다.")
    ).toBeInTheDocument();
  });

  it("이메일 규칙을 지키지 않았을 경우 에러 메시지를 출력한다.", async () => {
    render(<MyForm />);

    await act(async () => {
      //getByLabelText 안에서는 /email/i (정규표현식으로 email을 찾으며 i는 대소문자 구분X의 의미)
      fireEvent.input(screen.getByLabelText(/이메일/i), {
        target: { value: "invalid-email" },
      });
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(
      await screen.findByText("올바른 이메일 주소를 입력하세요.")
    ).toBeInTheDocument();
  });

  it("모든 필드가 올바르게 입력된 경우 에러를 출력하지 않는다.", async () => {
    render(<MyForm />);

    await act(async () => {
      fireEvent.input(screen.getByLabelText(/이름/i), {
        target: { value: "John Doe" },
      });
      fireEvent.input(screen.getByLabelText(/이메일/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.submit(screen.getByRole("button"));
    });

    expect(
      screen.queryByText("이름은 필수 항목 입니다.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("이메일은 필수 항목 입니다.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("올바른 이메일 주소를 입력하세요.")
    ).not.toBeInTheDocument();
  });
});
