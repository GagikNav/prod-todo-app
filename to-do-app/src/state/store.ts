import { create } from "zustand";
import { ToDo, ToDoState } from "../interfaces/interfaces";

const useStore = create<ToDoState>((set) => ({
  todos: [],
  addToDo: (description: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          completed: false,
          title: description,
        } as ToDo,
      ],
    }));
  },
  removeToDo: (id: number) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
  changeCompletedStatus: (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        return todo.id === id
          ? ({ ...todo, completed: !todo.completed } as ToDo)
          : todo;
      }),
    }));
  },
}));

export default useStore;
