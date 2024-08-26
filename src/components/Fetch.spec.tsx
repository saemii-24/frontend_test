import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Fetch from "./Fetch"; // Fetch 컴포넌트 파일 경로

// Mock the fetchData function
vi.mock("./Fetch", () => ({
  fetchData: vi.fn(),
}));

const { fetchData } = require("./Fetch");

describe("Fetch Component", () => {
  it("should render the button and handle fetch data", () => {
    render(<Fetch />);

    // Check if the button is rendered
    expect(screen.getByText("Fetch Data")).toBeInTheDocument();
  });

  it("should display loading text when fetching data", async () => {
    // Mock fetchData to simulate a loading state
    fetchData.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("Fetch Data"));

    // Check if loading text appears
    expect(screen.getByText("로딩중...")).toBeInTheDocument();
  });

  it("should display data when fetch is successful", async () => {
    // Mock fetchData to return dummy data
    fetchData.mockResolvedValue({ movies: ["Movie 1", "Movie 2"] });

    render(<Fetch />);

    fireEvent.click(screen.getByText("Fetch Data"));

    // Wait for the data to be rendered
    await waitFor(() => {
      expect(
        screen.getByText('데이터: {"movies":["Movie 1","Movie 2"]}')
      ).toBeInTheDocument();
    });
  });

  it("should display error message when fetch fails", async () => {
    // Mock fetchData to throw an error
    fetchData.mockRejectedValue(
      new Error("데이터를 불러오는 데 실패했습니다.")
    );

    render(<Fetch />);

    fireEvent.click(screen.getByText("Fetch Data"));

    // Wait for the error message to be rendered
    await waitFor(() => {
      expect(
        screen.getByText("에러 발생!: 데이터를 불러오는 데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });
});
