import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Fetch from "./Fetch";
import fetchData from "./fetchData";
-(
  // fetchData 모듈을 모킹합니다.
  vi.mock("./fetchData", () => ({
    default: vi.fn(),
  }))
);

const { default: mockedFetchData } = require("./fetchData");

describe("Fetch 컴포넌트", () => {
  it("데이터를 fetch하기 위한 버튼을 불러와야 한다.", () => {
    render(<Fetch />);
    expect(screen.getByText("데이터 불러오기")).toBeInTheDocument();
  });

  it("데이터를 불러오는 중에는 '로딩중'이 표시되어야 한다.", async () => {
    mockedFetchData.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("데이터 불러오기"));

    expect(screen.getByText("로딩중...")).toBeInTheDocument();
  });

  it("데이터가 성공적으로 불러와지는지 확인한다.", async () => {
    mockedFetchData.mockResolvedValue({ movies: ["Movie 1", "Movie 2"] });

    render(<Fetch />);

    fireEvent.click(screen.getByText("데이터 불러오기"));

    await waitFor(() => {
      expect(
        screen.getByText('데이터: {"movies":["Movie 1","Movie 2"]}')
      ).toBeInTheDocument();
    });
  });

  it("fetch가 실패할 경우 실패 문구를 표시한다.", async () => {
    mockedFetchData.mockRejectedValue(
      new Error("데이터를 불러오는 데 실패했습니다.")
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("데이터 불러오기"));

    await waitFor(() => {
      expect(
        screen.getByText("에러 발생!: 데이터 불러오는 데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });
});
