export interface ToDo {
  title: string;
  completed: boolean;
}

export interface ToDoWithId extends ToDo {
  id: number;
}

export interface ToDoState {
  todos: ToDoWithId[];
  initializeToDos: (incomingToDos: ToDoWithId[]) => void;
  // addToDo: (description: string) => void;
  removeToDo: (id: number) => void;
  changeCompletedStatus: (id: number) => void;
}
