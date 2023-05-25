import { create } from "zustand";
import { ToDoState, ToDoWithId } from "../interfaces/interfaces";

const useStore = create<ToDoState>((set) => ({
  todos: [],
  initializeToDos: (incomingToDos: ToDoWithId[]) => {
    set(() => ({
      todos: incomingToDos,
    }));
  },
  removeToDo: (id: number) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
}));

export default useStore;
