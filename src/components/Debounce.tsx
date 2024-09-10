// debounce 함수: 연속된 이벤트 호출을 지연시키는 역할
export function debounce(func: (...args: any[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>; // 타임아웃 ID를 저장하기 위한 변수

  return (...args: any[]) => {
    clearTimeout(timeout); // 이전 타이머 취소
    timeout = setTimeout(() => {
      func(...args); // 지연 후 원래 함수 실행
    }, delay);
  };
}
