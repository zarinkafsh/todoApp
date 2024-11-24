export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  toggleTodo: (id: number, completed: boolean) => void;
  loading: boolean;
}

export type ActionType = {
  type: string;
  payload: Record<any, any>;
}