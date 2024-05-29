import { create } from "zustand";

export const useTask = create((set) => ({
  taskDetails: {},
  selectedBoard: "",
  setSelectedBoard: (board: string) => set({ selectedBoard: board }),
  setTaskDetails: (updatedDetails: any) =>
    set((state: any) => ({
      taskDetails: { ...state.taskDetails, ...updatedDetails },
    })),
  deleteTask: (id: string, taskId: string, type: string) =>
    set((state: any) => {
      const newList = state.taskDetails[id];
      let newListT = [];
      for (let i = 0; i < newList[type].length; i++) {
        if (newList[type][i].id !== taskId) {
          newListT.push(newList[type][i]);
        }
      }

      return {
        taskDetails: {
          ...state.taskDetails,
          [id]: {
            ...state.taskDetails[id],
            [type]: newListT,
          },
        },
      };
    }),
  updateTask: (id: string, taskId: string, type: string, value: any) =>
    set((state: any) => {
      const newList = state.taskDetails[id];
      let newListT = [];
      let modifyStatus = null;
      for (let i = 0; i < newList[type].length; i++) {
        if (newList[type][i].id == taskId) {
          if (value.status == type) {
            newListT.push(value);
          } else {
            modifyStatus = value;
          }
        } else {
          newListT.push(newList[type][i]);
        }
      }

      return {
        taskDetails: {
          ...state.taskDetails,
          [id]: {
            ...state.taskDetails[id],
            [type]: newListT,
            ...(modifyStatus && {
              [modifyStatus.status]: [
                ...state.taskDetails[id][modifyStatus.status],
                modifyStatus,
              ],
            }),
          },
        },
      };
    }),
  setBoard: (taskDetails: any) =>
    set((state: any) => ({
      taskDetails: taskDetails,
    })),
}));
