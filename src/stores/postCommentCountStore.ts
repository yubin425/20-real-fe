import { create } from 'zustand';

export const usePostCommentCountStore = create<{
  count: number;
  set: (n: number) => void;
  increment: () => void;
  decrement: () => void;
}>((set) => ({
  count: 0,
  set: (n) => set({ count: n }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(state.count - 1, 0) })),
}));
