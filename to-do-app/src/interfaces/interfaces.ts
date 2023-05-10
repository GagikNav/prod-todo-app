export interface ToDo {
  title: string;
  completed: boolean;
  id: number;
}

export interface ToDoState {
  todos: ToDo[];
  addToDo: (description: string) => void;
  removeToDo: (id: number) => void;
  changeCompletedStatus: (id: number) => void;
}
