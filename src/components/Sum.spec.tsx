import sum from "./sum";

describe("spyOn 을 학습한다.", () => {
  it("sum 함수에 spyOn을 적용해 동작을 검증한다.", () => {
    // sum 함수에 spyOn 적용
    const sumSpy = jest.spyOn({ sum }, "sum");

    // sum 함수 호출
    const result = sum(3, 7);

    // 함수 호출 여부 확인
    expect(sumSpy).toHaveBeenCalled();
    expect(sumSpy).toHaveBeenCalledTimes(1);

    // 호출된 인수 확인
    expect(sumSpy).toHaveBeenCalledWith(3, 7);

    // 결과값 확인
    expect(result).toBe(10);

    // Spy 해제
    sumSpy.mockRestore();
  });

  it("원래 함수의 구현을 모킹한다.", () => {
    // sum 함수에 spyOn 적용 및 구현 모킹
    const sumSpy = jest
      .spyOn({ sum }, "sum")
      .mockImplementation((a, b) => a * b);

    // 모킹된 함수 호출
    const result = sum(3, 7);

    // 호출 여부와 모킹된 결과 확인
    expect(sumSpy).toHaveBeenCalled();
    expect(sumSpy).toHaveBeenCalledWith(3, 7);
    expect(result).toBe(21); // 원래는 10이어야 하지만, 모킹된 구현(a * b)로 인해 21이 반환됨

    // Spy 해제
    // 해제 함으로서 원래 함수의 동작을 복원하여, 다른 테스트에 영향을 주지 않도록 한다.
    sumSpy.mockRestore();
  });
});
