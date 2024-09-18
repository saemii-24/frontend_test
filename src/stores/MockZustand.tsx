import useCountStore from "@/stores/counterStore";

type State = {
  count: number;
};

type Action = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// mockStore 함수 수정
const mockStore = <T,>(
  hook: {
    getState: () => T;
    setState: (arg: Partial<T> | T, replace?: boolean) => void;
  },
  state: Partial<T>
) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, false); // 부분 상태 업데이트로 설정
};

// count 상태와 액션을 모킹하는 함수
export const mockUseCountStore = (state: Partial<State & Action>) => {
  mockStore(useCountStore as any, state);
};

// increment 함수 모킹
export const mockIncrement = () => {
  mockUseCountStore({
    increment: () => {
      useCountStore.setState((state) => ({ count: state.count + 1 }), false); // 부분 상태 업데이트
    },
  });
};

// decrement 함수 모킹
export const mockDecrement = () => {
  mockUseCountStore({
    decrement: () => {
      useCountStore.setState((state) => ({ count: state.count - 1 }), false); // 부분 상태 업데이트
    },
  });
};

// reset 함수 모킹
export const mockReset = () => {
  mockUseCountStore({
    reset: () => {
      useCountStore.setState({ count: 0 }, false); // 부분 상태 업데이트
    },
  });
};
