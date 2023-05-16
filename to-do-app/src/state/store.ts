import { create } from "zustand";
import { ToDoState, ToDoWithId } from "../interfaces/interfaces";

const useStore = create<ToDoState>((set) => ({
  todos: [],
  initializeToDos: (incomingToDos: ToDoWithId[]) => {
    set(() => ({
      todos: incomingToDos,
    }));
  },
  // addToDo: (description: string) => {
  //   set((state) => ({
  //     todos: [
  //       ...state.todos,
  //       {
  //         completed: false,
  //         title: description,
  //       } as ToDoWithId,
  //     ],
  //   }));
  // },
  removeToDo: (id: number) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
  changeCompletedStatus: (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        return todo.id === id
          ? ({ ...todo, completed: !todo.completed } as ToDoWithId)
          : todo;
      }),
    }));
  },
}));

export default useStore;
