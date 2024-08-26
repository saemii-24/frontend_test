import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Fetch from "./Fetch";

// fetchData를 mocking 한다. (Fetch에서 사용하는 함수)
// 이떄 vi.fn()으로 fetchData의 모킹된 버전을 생성한다.
vi.mock("./Fetch", () => ({
  fetchData: vi.fn(),
}));

const { fetchData } = require("./Fetch");

describe("Fetch 컴포넌트", () => {
  it("데이터를 fetch하기 위한 버튼을 불러와야 한다.", () => {
    render(<Fetch />);

    // 버튼이 dom에 존재하는지 확인함
    expect(screen.getByText("Fetch Data")).toBeInTheDocument();
  });

  it("데이터를 불러오는 중에는 '로딩중'이 표시되어야 한다.", async () => {
    // mocking 해둔 fetch데이터를 이용해 loading 상태를 확인한다.
    // implementation = 구현하다
    // fetch data의 모킹된 구현을 설정 -> promise를 주도록
    // 이 구현은 1초 동안 대기한 후 빈 배열을 반환함
    fetchData.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("Fetch Data"));

    // 로딩 텍스트가 표시되는지 확인한다.
    expect(screen.getByText("로딩중...")).toBeInTheDocument();
  });

  it("데이터가 성공적으로 불러와지는지 확인한다.", async () => {
    // mocking 해둔 fetchData에서 데이터를 표시한다.
    //mockResolvedValue = 모킹된 함수가 호출될 때 특정 값을 Promise를 통해 반환한다.
    fetchData.mockResolvedValue({ movies: ["Movie 1", "Movie 2"] });

    render(<Fetch />);

    fireEvent.click(screen.getByText("Fetch Data"));

    //데이터가 렌더링 되는 것을 기다리고, 표시한다.
    //waitFor = 기본적으로 1초동안 기다리고 실행함
    //  await waitFor(() => { 다음과 같은 방식으로 timeout을 줄 수도 있음
    //   expect(screen.getByText('데이터: {"movies":["Movie 1","Movie 2"]}')).toBeInTheDocument();
    // }, { timeout: 3000 });

    await waitFor(() => {
      expect(
        screen.getByText('데이터: {"movies":["Movie 1","Movie 2"]}')
      ).toBeInTheDocument();
    });
  });

  it("fetch가 실패할 경우 실패 문구를 표시한다.", async () => {
    // 에러 데이터를 출력하는 Mock fetchData
    fetchData.mockRejectedValue(
      new Error("데이터를 불러오는 데 실패했습니다.")
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("데이터 불러오기"));

    // 렌더 에러를 기다리고 출력한다.
    await waitFor(() => {
      expect(
        screen.getByText("에러 발생!: 데이터를 불러오는 데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });
});
