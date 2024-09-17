import { create } from "zustand";

// Define the state and actions
type State = {
  count: number;
};

type Action = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// Create the store with state and actions
const useCountStore = create<State & Action>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCountStore;
