import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    scrollY: 20,
    items: [],
    maxScrollHeight: 0,
    windowSize: { width: 0, height: 0 },
    currentPos: null,
    setCurrentPos: (currentPos) => set({ currentPos: currentPos }),
    setWindowSize: (setWindowSize) => set({ windowSize: setWindowSize }),
    setScrollY: (newScrollY) => set({ scrollY: newScrollY }),
    setMaxScrollHeight: (newMaxScrollHeight) =>
      set({ maxScrollHeight: newMaxScrollHeight }),

    setItems: (newItems) => set({ items: newItems }),
  }))
);

export const useFlag = create((set) => ({
  load: false,
  page: 1,
  setLoad: (newLoad) => set({ load: newLoad }),
  setPage: (newPage) => set({ page: newPage }),
}));
