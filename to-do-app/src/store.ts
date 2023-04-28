import { create } from "zustand";

const useStore = create((set) => ({
  totalToDos: 0,
  //@ts-ignore
  addToDo: () => set((state) => ({ totalToDos: state.totalToDos + 1 })),
}));

export default useStore;
