export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, updatedText: string) => void;
  toggleTodo: (id: number) => void;
  setCurrentTodo: (todo: TodoType) => void;
  currentTodo: TodoType | null;
  loading: boolean;
}