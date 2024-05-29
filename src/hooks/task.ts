import { create } from "zustand";

export const useTask = create((set) => ({
  taskDetails: {},
  selectedBoard: "",
  setSelectedBoard: (board: string) => set({ selectedBoard: board }),
  setTaskDetails: (updatedDetails: any) =>
    set((state: any) => ({
      taskDetails: { ...state.taskDetails, ...updatedDetails },
    })),
}));
